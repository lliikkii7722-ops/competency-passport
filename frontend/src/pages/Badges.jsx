import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Award, Star, Trophy, Zap, Lock } from 'lucide-react';

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [myBadges, setMyBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBadges(); }, []);

  const fetchBadges = async () => {
    try {
      // Mock data for now - you can create backend endpoint later
      const mockBadges = [
        { id: 1, name: 'Profile Starter', description: 'Complete your profile', icon: '⭐', rarity: 'COMMON', points: 10, earned: true },
        { id: 2, name: 'Education Master', description: 'Add 3+ education entries', icon: '🎓', rarity: 'COMMON', points: 20, earned: true },
        { id: 3, name: 'Skill Collector', description: 'Add 5+ skills', icon: '💎', rarity: 'RARE', points: 30, earned: false },
        { id: 4, name: 'Project Pro', description: 'Add 3+ projects', icon: '🚀', rarity: 'RARE', points: 40, earned: false },
        { id: 5, name: 'Certified Pro', description: 'Add 2+ certificates', icon: '🏆', rarity: 'EPIC', points: 50, earned: false },
        { id: 6, name: 'Full Stack Hero', description: 'Complete all profile sections', icon: '👑', rarity: 'LEGENDARY', points: 100, earned: false },
      ];
      setBadges(mockBadges);
      setMyBadges(mockBadges.filter(b => b.earned));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'COMMON': return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'RARE': return 'bg-blue-50 text-blue-600 border-blue-300';
      case 'EPIC': return 'bg-purple-50 text-purple-600 border-purple-300';
      case 'LEGENDARY': return 'bg-yellow-50 text-yellow-600 border-yellow-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Achievement Badges</h1>
        <p className="text-gray-600">Complete tasks to earn badges and level up!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">{myBadges.length}/{badges.length}</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Star size={24} className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{myBadges.reduce((a, b) => a + b.points, 0)}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-purple-600" />
            <div>
              <p className="text-2xl font-bold">Level {Math.floor(myBadges.reduce((a, b) => a + b.points, 0) / 50) + 1}</p>
              <p className="text-sm text-gray-600">Current Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className={`card p-4 text-center transition-all ${
            badge.earned ? 'hover:shadow-lg' : 'opacity-60 grayscale'
          }`}>
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 border-2 ${
              badge.earned ? getRarityColor(badge.rarity) : 'bg-gray-100 border-gray-200'
            }`}>
              {badge.earned ? badge.icon : <Lock size={24} className="text-gray-400" />}
            </div>
            <h3 className="font-semibold text-sm">{badge.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                badge.rarity === 'LEGENDARY' ? 'bg-yellow-100 text-yellow-700' :
                badge.rarity === 'EPIC' ? 'bg-purple-100 text-purple-700' :
                badge.rarity === 'RARE' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {badge.rarity}
              </span>
            </div>
            {badge.earned && (
              <p className="text-xs text-green-600 mt-2 font-medium">+{badge.points} pts</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;