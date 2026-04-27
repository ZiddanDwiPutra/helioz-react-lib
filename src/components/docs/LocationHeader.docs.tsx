import React from 'react';
import { LocationHeader } from '../molecules/LocationHeader';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4 group">
    <pre className="bg-[#0f1117] text-slate-300 p-4 rounded-lg font-mono text-[13px] leading-relaxed border border-slate-800 overflow-x-auto">
      {code}
    </pre>
  </div>
);

const LocationHeaderDocs: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">LocationHeader</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          The primary navigation header for the Helioz Food App theme. Features location selector, user profile, and high-gloss aesthetics.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Example</h2>
        <div className="bg-[#020617] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <LocationHeader 
            location="Rasa Helioz, Jakarta" 
            onLocationClick={() => alert('Change Location')}
            onProfileClick={() => alert('Profile Clicked')}
          />
        </div>
        <CodeBlock code={`import { LocationHeader } from 'helioz-react-lib';

<LocationHeader 
  location="Rasa Helioz, Jakarta" 
  onLocationClick={handleLocationChange}
  onProfileClick={handleProfileNav}
/>`} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-300">
                <th className="py-4 font-semibold">Prop</th>
                <th className="py-4 font-semibold">Type</th>
                <th className="py-4 font-semibold">Default</th>
                <th className="py-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">location</td>
                <td className="py-4">string</td>
                <td className="py-4">-</td>
                <td className="py-4">The current location string</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">userAvatar</td>
                <td className="py-4">string</td>
                <td className="py-4">placeholder url</td>
                <td className="py-4">URL of the user's profile image</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">onLocationClick</td>
                <td className="py-4"></td>
                <td className="py-4">-</td>
                <td className="py-4">Callback when location area is clicked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LocationHeaderDocs;
