"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      router.push("/notes/center");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Web3 投资笔记</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <BreadcrumbPage>发布笔记</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main>
        <div className="w-2/3 h-1/2 flex flex-col justify-center items-center m-52">
          <Textarea
            className="min-h-[200px]"
            placeholder="Type your message here."
          />

          <Button className="mt-12">Send message</Button>
        </div>
      </main>

      <main>
        <div className="w-2/3 h-1/2 flex flex-col justify-center items-center m-52">
          <Textarea
            className="min-h-[200px]"
            placeholder="Type your message here."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button className="mt-12" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish Note"}
          </Button>
        </div>
      </main>
    </>
  );
}
