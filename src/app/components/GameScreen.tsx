// src/components/GameScreen.tsx

'use client';

// ... (useState, AVAILABLE_TAGS, CREATIVE_CARDS の定義は変更なし) ...

import { useState } from 'react';

const AVAILABLE_TAGS = ['20代女性', '30代男性', '学生', '主婦', 'ファッション', 'ガジェット', '都心在住', '地方在住', 'アウトドア', 'インドア'];
const CREATIVE_CARDS = [
  { id: 1, title: 'A: 若者向け画像', description: 'インパクト重視のビジュアル' },
  { id: 2, title: 'B: セール告知', description: '価格メリットを全面に押し出す' },
  { id: 3, title: 'C: 機能性アピール', description: '製品の特長をテキストで訴求' },
];


export default function GameScreen({ scenario, onBack }) {
  const [bidAmount, setBidAmount] = useState(100);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCreativeId, setSelectedCreativeId] = useState(null);
  const [dailyResult, setDailyResult] = useState(null);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRunDay = () => {
    // --- シミュレーションロジック ---
    const impressions = 10000;
    const clickRate = selectedCreativeId === 1 ? 0.05 : 0.02;
    const clicks = impressions * clickRate;
    const conversionRate = selectedTags.includes('ファッション') ? 0.1 : 0.05;
    const conversions = Math.floor(clicks * conversionRate);
    const cost = clicks * bidAmount;
    
    // 新しい指標の計算
    const averageOrderValue = 15000; // 顧客一人当たりの平均売上を仮定
    const revenue = conversions * averageOrderValue; // 売上
    const cpm = (cost / impressions) * 1000; // CPM
    const cpa = conversions > 0 ? cost / conversions : 0; // CPA (0除算を回避)
    const roas = cost > 0 ? (revenue / cost) * 100 : 0; // ROAS (0除算を回避)

    setDailyResult({
      impressions,
      clicks,
      conversions,
      cost,
      cpm,
      cpa,
      roas,
      revenue,
    });
  };


  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        {scenario.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">現在の状況</h3>
          <p>経過日数: 1日目 / 30日</p>
          <p>残り予算: ¥100,000</p>
          
          {dailyResult && (
            <div className="mt-4 pt-4 border-t space-y-1">
              <h4 className="font-bold text-lg text-green-600">本日の成果</h4>
              <p>売上: {dailyResult.revenue.toLocaleString()}円</p>
              <p>費用: {dailyResult.cost.toLocaleString()}円</p>
              <hr className="my-1"/>
              <p>CPA: {Math.floor(dailyResult.cpa).toLocaleString()}円</p>
              <p>ROAS: {dailyResult.roas.toFixed(1)}%</p>
              <p>CPM: {Math.floor(dailyResult.cpm).toLocaleString()}円</p>
              <hr className="my-1"/>
              <p>表示回数: {dailyResult.impressions.toLocaleString()}回</p>
              <p>CV数: {dailyResult.conversions}件</p>
            </div>
          )}
        </div>

        {/* ... (右カラムのアクションエリアは変更なし) ... */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md space-y-6">
          <h3 className="font-bold mb-2">アクション</h3>
          
          <div>
            <label htmlFor="bid" className="block font-medium mb-1">入札単価: <span className="font-bold text-blue-600">{bidAmount}円</span></label>
            <input type="range" id="bid" min="10" max="500" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="w-full" />
          </div>
          
          <div>
            <label className="block font-medium mb-2">ターゲット（{selectedTags.length}個選択中）</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button key={tag} onClick={() => handleTagToggle(tag)} className={`py-1 px-3 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{tag}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">クリエイティブ</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CREATIVE_CARDS.map((card) => (
                <div key={card.id} onClick={() => setSelectedCreativeId(card.id)} className={`p-4 border-2 rounded-lg cursor-pointer ${selectedCreativeId === card.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                  <h4 className="font-bold">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ... (ボタン部分は変更なし) ... */}
      <div className="mt-6 flex justify-between items-center">
        <button onClick={onBack} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
          シナリオ選択に戻る
        </button>
        <button onClick={handleRunDay} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 text-lg">
          この内容で1日運用する 🚀
        </button>
      </div>
    </div>
  );
}