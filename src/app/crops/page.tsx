import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Filter, 
  MapPin, 
  Calendar, 
  Droplets, 
  Sun,
  ChevronRight,
  Sprout,
  Flower,
  Apple,
  Leaf,
  Wrench,
  CheckCircle2
} from "lucide-react";

export default function CropsPage() {
  const crops = [
    {
      id: 1,
      name: "Tomatoes",
      variety: "Cherry",
      progress: 75,
      stage: "fruiting",
      stageIcon: Flower,
      field: "Field A",
      plantedDate: "2024-01-15",
      harvestDate: "2024-03-15",
      status: "growing",
      notes: "Looking healthy, first fruits appearing"
    },
    {
      id: 2,
      name: "Lettuce",
      variety: "Romaine",
      progress: 45,
      stage: "vegetative",
      stageIcon: Sprout,
      field: "Field B",
      plantedDate: "2024-02-01",
      harvestDate: "2024-03-01",
      status: "growing",
      notes: "Good growth, needs more water"
    },
    {
      id: 3,
      name: "Strawberries",
      variety: "Alpine",
      progress: 90,
      stage: "fruiting",
      stageIcon: Flower,
      field: "Field C",
      plantedDate: "2024-01-01",
      harvestDate: "2024-02-28",
      status: "ready",
      notes: "Ready for harvest, berries are ripe"
    },
    {
      id: 4,
      name: "Carrots",
      variety: "Nantes",
      progress: 30,
      stage: "vegetative",
      stageIcon: Sprout,
      field: "Field D",
      plantedDate: "2024-02-10",
      harvestDate: "2024-04-10",
      status: "growing",
      notes: "Seedlings established, thinning needed"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling': return 'text-blue-500';
      case 'vegetative': return 'text-green-500';
      case 'flowering': return 'text-purple-500';
      case 'fruiting': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success-500';
      case 'growing': return 'bg-warning-500';
      case 'harvested': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Search and Add */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crops</h1>
            <Link href="/crops/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Crop</span>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops..."
                className="w-full pl-10 pr-4 py-2 border border-earth-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-earth-500"
              />
            </div>
            <button className="p-2 border border-earth-200 dark:border-gray-700 rounded-lg hover:bg-earth-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Crops</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success-500">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ready to Harvest</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning-500">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Cards */}
        <div className="space-y-4">
          {crops.map((crop) => (
            <Card key={crop.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                        <crop.stageIcon className={`h-6 w-6 ${getStageColor(crop.stage)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{crop.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{crop.variety}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(crop.status)}`}>
                        {crop.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{crop.field}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Harvest: {crop.harvestDate}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{crop.progress}%</span>
                      </div>
                      <div className="w-full bg-earth-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-nature-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${crop.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">{crop.notes}</p>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: MapPin, label: 'Fields', href: '/fields' },
            { icon: Calendar, label: 'Tasks', href: '/tasks' },
            { icon: Wrench, label: 'Inventory', href: '/inventory' },
            { icon: CheckCircle2, label: 'Reports', href: '/reports' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
