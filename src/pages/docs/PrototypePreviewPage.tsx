import { useNavigate, useParams } from 'react-router-dom';
import { usePrototypeStore, type ComponentType } from '../../store/usePrototypeStore';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { Checkbox } from '../../components/Checkbox';
import { Radio } from '../../components/Radio';
import { Dropdown } from '../../components/Dropdown';
import { Badge } from '../../components/Badge';
import { Toggle } from '../../components/Toggle';
import { LocationHeader } from '../../components/molecules/LocationHeader';
import { SearchBar } from '../../components/molecules/SearchBar';
import React from 'react';

const RenderElement: React.FC<{ 
  type: ComponentType; 
  props: any; 
  id: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  onValueChange: (id: string, value: string) => void;
  onValidate: () => void;
}> = ({ type, props, id, values, errors, onValueChange, onValidate }) => {
  const navigate = useNavigate();
  const commonProps = { 
    ...props, 
    className: `w-full ${props.className || ''}`,
    value: values[id] || '',
    onChange: (e: any) => onValueChange(id, e.target.value),
    error: errors[id]
  };

  const handleClick = () => {
    if (type === 'Button') {
      if (props.actionType === 'redirection' && props.targetScreenId) {
        navigate(`/preview/prototype/${props.targetScreenId}`);
      } else if (props.actionType === 'validate') {
        onValidate();
      }
    }
  };

  switch (type) {
    case 'Button': return <Button {...commonProps} onClick={handleClick}>{props.children || 'Button'}</Button>;
    case 'FormInput': return <FormInput {...commonProps} />;
    case 'Checkbox': return <Checkbox {...commonProps} />;
    case 'Radio': return <Radio {...commonProps} />;
    case 'Dropdown': return <Dropdown {...commonProps} />;
    case 'Badge': return <div className="w-full flex justify-center"><Badge {...props}>{props.children || 'Badge'}</Badge></div>;
    case 'BadgeSlider': 
      return (
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-2 min-w-max px-2">
            {(props.badges || []).map((text: string, i: number) => (
              <Badge key={i} variant={props.variant || 'primary'}>{text}</Badge>
            ))}
          </div>
        </div>
      );
    case 'Toggle': return <Toggle {...commonProps} />;
    case 'Label': 
    case 'Paragraph': 
      return (
        <div 
          className={`w-full prose prose-invert max-w-none ${type === 'Label' ? 'font-bold' : ''}`}
          dangerouslySetInnerHTML={{ __html: props.html || '' }} 
        />
      );
    case 'LocationHeader': return <LocationHeader {...commonProps} />;
    case 'SearchBar': return <SearchBar {...commonProps} />;
    default: return null;
  }
};

export const PrototypePreviewPage: React.FC = () => {
  const { screenId } = useParams();
  const { screens } = usePrototypeStore();
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const screen = screens.find(s => s.id === screenId);

  const handleValueChange = (id: string, value: string) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleValidate = (buttonCell: any) => {
    const validateIds = buttonCell.props.validateInputIds || [];
    const newErrors: Record<string, string> = {};

    validateIds.forEach((id: string) => {
      // Find the cell to get its variant
      const cell = screen?.rows.flatMap(r => r.cells).find(c => c.id === id);
      if (!cell) return;

      const value = formValues[id] || '';
      const variant = cell.props.variant || 'text';

      if (!value) {
        newErrors[id] = 'This field is required';
        return;
      }

      if (variant === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[id] = 'Invalid email address';
      } else if (variant === 'phone' && value.length < 10) {
        newErrors[id] = 'Phone number is too short';
      } else if (variant === 'numeric' && !/^\d+$/.test(value)) {
        newErrors[id] = 'Must be a number';
      } else if (variant === 'currency' && !value.includes('Rp')) {
        newErrors[id] = 'Invalid currency format';
      }
    });

    setErrors(newErrors);
  };

  if (!screen) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-500 font-sans">
        Screen not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {screen.rows.map(row => (
          <div key={row.id} style={{ minHeight: row.minHeight }} className="w-full">
            <div className={`flex gap-4 h-full ${row.direction === 'row' ? 'flex-row items-end' : 'flex-col'}`}>
              {row.cells.map(cell => (
                <div key={cell.id} style={{ flex: cell.flex }} className="h-full flex items-center justify-center">
                  {cell.component && (
                    <RenderElement 
                      id={cell.id}
                      type={cell.component} 
                      props={cell.props} 
                      values={formValues}
                      errors={errors}
                      onValueChange={handleValueChange}
                      onValidate={() => handleValidate(cell)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrototypePreviewPage;
