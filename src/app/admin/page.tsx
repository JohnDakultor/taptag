"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format } from "date-fns";


const COLORS = ["#16a34a", "#dc2626"];

export default function AdminPage() {
  const [keys, setKeys] = useState<{ value: string; activated: boolean }[]>([]);
  const [filter, setFilter] = useState<"all" | "activated" | "notActivated">(
    "all"
  );
  const [keyCount, setKeyCount] = useState(1);
  const [users, setUsers] = useState<
  { name: string; email: string; username: string; createdAt: string }[]
>([]);


const getUserGrowthByMonth = () => {
  const growthMap = new Map<string, number>();

  users.forEach((user) => {
    const month = format(new Date(user.createdAt), "yyyy-MM");
    growthMap.set(month, (growthMap.get(month) || 0) + 1);
  });

  // Sort months and convert to cumulative array
  const sortedMonths = Array.from(growthMap.keys()).sort();
  let cumulative = 0;

  return sortedMonths.map((month) => {
    cumulative += growthMap.get(month)!;
    return { month, users: cumulative };
  });
};

const userGrowthData = getUserGrowthByMonth();


  const generateKeys = async (count: number) => {
    const newKeys = Array.from({ length: count }, () =>
      Math.random().toString(36).substring(2, 10)
    );

    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: newKeys }),
      });

      const res = await fetch("/api/admin");
      const data = await res.json();
      setKeys(data);
    } catch (err) {
      console.error("Failed to save keys:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [keyRes, userRes] = await Promise.all([
          fetch("/api/admin"),
          fetch("/api/user"),
        ]);

        const keysData = await keyRes.json();
        const usersData = await userRes.json();

        if (Array.isArray(keysData)) setKeys(keysData);
        if (Array.isArray(usersData)) setUsers(usersData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const filteredKeys = keys.filter((key) =>
    filter === "all"
      ? true
      : filter === "activated"
      ? key.activated
      : !key.activated
  );

  const activatedCount = keys.filter((k) => k.activated).length;
  const notActivatedCount = keys.length - activatedCount;

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Generated Keys",
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-black shadow">
          <CardContent className="p-6">
            <p className="text-lg font-semibold">Total Users</p>
            <h2 className="text-3xl font-bold">{users.length}</h2>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-200 to-green-400 text-black shadow">
          <CardContent className="p-6">
            <p className="text-lg font-semibold">Keys Generated</p>
            <h2 className="text-3xl font-bold">{keys.length}</h2>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-200 to-red-400 text-black shadow">
          <CardContent className="p-6">
            <p className="text-lg font-semibold">Keys Activated</p>
            <h2 className="text-3xl font-bold">{activatedCount}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Key Activation Ratio</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Activated", value: activatedCount },
                    { name: "Not Activated", value: notActivatedCount },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Generator */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Generate Keys</h2>
          <div className="flex flex-wrap gap-4">
            <label className="text-black">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="all">All</option>
              <option value="activated">Activated</option>
              <option value="notActivated">Not Activated</option>
            </select>
            <Input
              type="number"
              min="1"
              value={keyCount}
              onChange={(e) => setKeyCount(Number(e.target.value))}
              className="max-w-[120px]"
            />
            <Button onClick={() => generateKeys(keyCount)}>Generate</Button>
            <Button variant="outline" onClick={handlePrint}>
              Print
            </Button>
          </div>

          <div
            ref={contentRef}
            className="max-h-[200px] overflow-auto border border-neutral-300 rounded print-full-height"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.map((keyObj, index) => (
                  <TableRow key={index}>
                    <TableCell>{keyObj.value}</TableCell>
                    <TableCell
                      className={
                        keyObj.activated ? "text-green-600" : "text-red-600"
                      }
                    >
                      {keyObj.activated ? "Activated" : "Not Activated"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
