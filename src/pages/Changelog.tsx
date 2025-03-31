import React from 'react';

export default function Changelog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Changelog</h1>
      <div className="space-y-8">
        {/* Versioning System */}
        <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
          <h2 className="text-2xl font-semibold mb-4">Versioning System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Version Structure</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-medium">X (Major Update):</span> Significant changes or overhauls</li>
                <li><span className="font-medium">Y (Feature Update):</span> New features or enhancements</li>
                <li><span className="font-medium">Z (Sub-Version):</span> Minor fixes or improvements</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Release Types</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-medium">Stable Release:</span> Fully tested and reliable</li>
                <li><span className="font-medium">Beta Release:</span> Testing version for early adopters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-6">
          {/* Version 3.9.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.9.x</h2>
              <span className="text-sm text-gray-400">03/2025</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.9.5 Advanced</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Improved support for Checkers, Savers, and account management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">v3.9.5 NFKD</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Integrated auto ban for prohibited names</li>
                  <li>Improved Checkers and Savers task management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 3.8.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.8.x</h2>
              <span className="text-sm text-gray-400">01-02/2025</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.8.9</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Made /tweak and /fetch accessible to free users</li>
                  <li>Removed Super Duolingo check when linking accounts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">v3.8.8</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Reworked background tasks for continuous operation</li>
                  <li>Increased free user loops to 240/day</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 3.7.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.7.x</h2>
              <span className="text-sm text-gray-400">01/2025</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.7.9</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Reworked StreakSaver</li>
                  <li>Limited free users to /streaksaver, XP and Gem Farm</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">v3.7.8</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Renamed /demo to /free with English support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 3.6.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.6.x</h2>
              <span className="text-sm text-gray-400">12/2024</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.6.3</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fixed various bugs</li>
                  <li>Removed /giftitem</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">v3.6.2</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Adjusted limits for free users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 3.5.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.5.x</h2>
              <span className="text-sm text-gray-400">12/2024</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.5.7</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fixed account limit bypass in /link</li>
                  <li>Improved cooldown logic</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">v3.5.6</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Introduced "Ads Program" for free users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 3.4.x */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Version 3.4.x</h2>
              <span className="text-sm text-gray-400">12/2024</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">v3.4.0</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fixed cooldown logic</li>
                  <li>Added /league command</li>
                  <li>Improved LeagueSaver logic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
