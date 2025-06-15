"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MessageSquareText,
  Globe,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

const gold = "text-yellow-400";

const contactOptions = [
  {
    value: "phone",
    label: "Phone",
    icon: <Phone className="inline-block mr-1" />,
  },
  {
    value: "sms",
    label: "SMS",
    icon: <MessageSquareText className="inline-block mr-1" />,
  },
  {
    value: "email",
    label: "Email",
    icon: <Mail className="inline-block mr-1" />,
  },
];

export default function LinkPage() {
  const [contacts, setContacts] = useState([{ type: "phone", value: "" }]);
  const [socials, setSocials] = useState([{ platform: "", username: "" }]);
  // const [banks, setBanks] = useState([{ bankName: "", accountNumber: "" }]);

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleAdd = (setFn: any, obj: any) =>
    setFn((prev: any) => [...prev, obj]);
  const handleRemove = (setFn: any, index: number) =>
    setFn((prev: any) => prev.filter((_: any, i: number) => i !== index));

  useEffect(() => {
    async function fetchLinks() {
      const res = await fetch("/api/links");
      const data = await res.json();

      const contacts = data.filter((l: any) => l.type === "contact");
      const socials = data.filter((l: any) => l.type === "social");
      // const banks = data.filter((l: any) => l.type === "bank");

      setContacts(
        contacts.map((c: any) => ({ type: c.label, value: c.value }))
      );
      setSocials(
        socials.map((s: any) => ({ platform: s.label, username: s.value }))
      );
      // setBanks(
      //   banks.map((b: any) => ({ bankName: b.label, accountNumber: b.value }))
      // );
    }

    fetchLinks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className={`text-2xl font-bold mb-6 ${gold}`}>Manage Your Links</h1>

      {/* Contacts */}
      <section className="border border-neutral-700 rounded-lg p-6 mb-8">
        <Form {...form}>
          <section className="border border-neutral-700 rounded-lg p-6 mb-8">
            <h2 className={`text-xl font-semibold mb-6 ${gold}`}>Contacts</h2>
            {contacts.map((contact, i) => (
              <div key={`contact-${i}`}>
                <div className="flex items-center space-x-4 mb-2">
                  <FormItem className="flex-1">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        value={contact.type}
                        onValueChange={(value) => {
                          const updated = [...contacts];
                          updated[i].type = value;
                          setContacts(updated);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <span className="mr-2">{opt.icon}</span>{" "}
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(setContacts, i)}
                    className="mt-6 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Remove
                  </Button>
                </div>

                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      type={contact.type === "email" ? "email" : "text"}
                      placeholder={
                        contact.type === "phone"
                          ? "e.g. +1234567890"
                          : contact.type === "sms"
                          ? "e.g. +1234567890"
                          : "e.g. example@email.com"
                      }
                      value={contact.value}
                      onChange={(e) => {
                        const updated = [...contacts];
                        updated[i].value = e.target.value;
                        setContacts(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className={`${gold} flex items-center mt-4`}
              onClick={() =>
                handleAdd(setContacts, { type: "phone", value: "" })
              }
            >
              <Plus size={16} className="mr-1" /> Add Contact
            </Button>
          </section>
        </Form>
      </section>

      {/* Social Media */}
      <section className="border border-neutral-700 rounded-lg p-6 mb-8">
        <Form {...form}>
          <section className="border border-neutral-700 rounded-lg p-6 mb-8">
            <h2 className={`text-xl font-semibold mb-6 ${gold}`}>
              Social Media
            </h2>
            {socials.map((social, i) => (
              <div key={`social-${i}`} className="mb-4">
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Instagram"
                      value={social.platform}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[i].platform = e.target.value;
                        setSocials(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>
                <FormItem className="mt-2">
                  <FormLabel>Username or URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. @yourhandle or https://..."
                      value={social.username}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[i].username = e.target.value;
                        setSocials(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(setSocials, i)}
                  className="mt-2 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className={`${gold} flex items-center mt-4`}
              onClick={() =>
                handleAdd(setSocials, { platform: "", username: "" })
              }
            >
              <Plus size={16} className="mr-1" /> Add Social Media
            </Button>
          </section>
        </Form>
      </section>

      {/* Bank Accounts (commented out) */}
      {/*
      <section className="border border-neutral-700 rounded-lg p-6 mb-8">
        <Form {...form}>
          <section className="border border-neutral-700 rounded-lg p-6 mb-8">
            <h2 className={`text-xl font-semibold mb-6 ${gold}`}>
              Bank Accounts
            </h2>
            {banks.map((bank, i) => (
              <div key={`bank-${i}`} className="mb-4">
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Bank of America"
                      value={bank.bankName}
                      onChange={(e) => {
                        const updated = [...banks];
                        updated[i].bankName = e.target.value;
                        setBanks(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>
                <FormItem className="mt-2">
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. 1234567890"
                      value={bank.accountNumber}
                      onChange={(e) => {
                        const updated = [...banks];
                        updated[i].accountNumber = e.target.value;
                        setBanks(updated);
                      }}
                    />
                  </FormControl>
                </FormItem>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(setBanks, i)}
                  className="mt-2 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className={`${gold} flex items-center mt-4`}
              onClick={() =>
                handleAdd(setBanks, { bankName: "", accountNumber: "" })
              }
            >
              <Plus size={16} className="mr-1" /> Add Bank Account
            </Button>
          </section>
        </Form>
      </section>
      */}

      {/* Saved Links */}
      <section className="mt-8 border-t border-neutral-700 pt-6">
        <h2 className={`text-xl font-semibold mb-4 ${gold}`}>
          Your Saved Links
        </h2>

        {/* Contacts */}
        {contacts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-neutral-300 mb-2">
              Contacts
            </h3>
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                {c.type === "phone" && (
                  <Phone size={16} className="text-yellow-400" />
                )}
                {c.type === "sms" && (
                  <MessageSquareText size={16} className="text-yellow-400" />
                )}
                {c.type === "email" && (
                  <Mail size={16} className="text-yellow-400" />
                )}
                <a
                  href={
                    c.type === "email"
                      ? `mailto:${c.value}`
                      : c.type === "sms"
                      ? `sms:${c.value}`
                      : `tel:${c.value}`
                  }
                  className="text-yellow-400 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Social Media */}
        {socials.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-neutral-300 mb-2">
              Social Media
            </h3>
            {socials.map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <Globe size={16} className="text-yellow-400" />
                <a
                  href={
                    s.username.startsWith("http")
                      ? s.username
                      : `https://www.${s.platform.toLowerCase()}.com/${s.username.replace(
                          "@",
                          ""
                        )}`
                  }
                  className="text-yellow-400 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.platform}: {s.username}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Bank Accounts Display (commented out) */}
        {/*
        {banks.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-neutral-300 mb-2">
              Bank Accounts
            </h3>
            {banks.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm text-neutral-400 mb-2 border border-neutral-700 px-3 py-2 rounded-md"
              >
                <span className="font-medium">{b.bankName}</span>
                <span className="font-mono tracking-wider">
                  {b.accountNumber}
                </span>
              </div>
            ))}
          </div>
        )}
        */}
      </section>

      <Button
        className="w-full py-3 mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md transition"
        onClick={async () => {
          const payload = [
            ...contacts.map((c) => ({
              type: "contact",
              label: c.type,
              value: c.value,
            })),
            ...socials.map((s) => ({
              type: "social",
              label: s.platform,
              value: s.username,
            })),
            // ...banks.map((b) => ({
            //   type: "bank",
            //   label: b.bankName,
            //   value: b.accountNumber,
            // })),
          ];

          const res = await fetch("/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            alert("Saved successfully!");
          } else {
            alert("Failed to save.");
          }
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}
