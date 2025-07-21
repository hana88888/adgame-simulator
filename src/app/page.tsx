// src/app/page.tsx

'use client';

import { useState } from 'react';
import GameScreen from '@/components/GameScreen';
// 型定義を外部ファイルからインポートする
import { Scenario } from '@/types'; 

export default function Home() {
  // selectedScenarioのStateにも型を指定する
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const scenarios: Scenario[] = [ // scenarios配列にも型を指定
    { id: 1, title: 'シナリオA：新作スニーカーを売れ！', difficulty: '★★☆' },
    { id: 2, title: 'シナリオB：老舗旅館の認知度アップ', difficulty: '★☆☆' },
    { id: 3, title: 'シナリオC：ニッチなSaaSを黒字化', difficulty: '★★★☆' },
  ];
  
  // 関数の引数に、インポートしたScenario型を指定する
  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  return (
    <main className="bg-slate-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          広告運用シミュレーションゲーム
        </h1>
        
        {selectedScenario ? (
          <GameScreen 
            scenario={selectedScenario} 
            onBack={() => setSelectedScenario(null)} 
          />
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-slate-600 mb-8">
              シナリオを選択してください
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold mb-2">{scenario.title}</h3>
                  <p className="text-slate-600 mb-4">難易度: {scenario.difficulty}</p>
                  <button onClick={() => handleSelectScenario(scenario)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    プレイする ▶
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}