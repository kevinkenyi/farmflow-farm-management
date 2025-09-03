import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  User,
  Activity,
  Sprout,
  Droplets,
  Wrench,
  Apple,
  Leaf,
  Camera,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import CropTimelineClient from "./CropTimelineClient";

export default async function CropTimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cropId = parseInt(id);
  
  return <CropTimelineClient cropId={cropId} />;
}
