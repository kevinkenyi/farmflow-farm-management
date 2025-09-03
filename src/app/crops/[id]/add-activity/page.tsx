import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, User, DollarSign, FileText } from 'lucide-react';
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import AddActivityClient from "./AddActivityClient";

export default async function AddActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cropId = parseInt(id);
  
  return <AddActivityClient cropId={cropId} />;
}
