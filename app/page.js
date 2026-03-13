"use client"
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge";
import { Wifi, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConfigConnection } from "./pages/ConfigConnection";


export default function Home() {
  const [filter, setFilter] = useState("home");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }
  return (
    <Card className="bg-black w-full h-screen border-none rounded-none p-0 gap-0">
      <div className="w-full h-full flex flex-col">
        {filter === "home" ? (
          <>
            <div className="flex flex-col items-center">
              <CardTitle className="font-bold p-1 text-white">Entrar</CardTitle>
              <Separator className="bg-gray-800" />
            </div>
            <div className="flex flex-col flex-1 px-6 pt-6 pb-8">

              {/* Conteúdo central */}
              <div className="flex flex-col flex-1 justify-center items-center w-full">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <Image
                    src="https://cdn.worldvectorlogo.com/logos/twitter-logo-2.svg"
                    alt="Logo"
                    width={90}
                    height={90}
                    className="invert"
                  />
                </div>

                {/* Badge de conexão */}
                <div className="flex justify-center mb-4">
                  <Badge className="bg-blue-600 text-sm px-3 py-1 gap-1.5">
                    <Wifi size={16} /> VIVO FRONT
                  </Badge>
                </div>

                {/* Texto de boas-vindas */}
                <div className="flex flex-col items-center mb-6">
                  <h1 className="text-3xl font-bold text-white">Bem-vindo</h1>
                  <p className="text-base text-gray-400 mt-1 text-center">
                    Digite suas credenciais para continuar
                  </p>
                </div>

                {/* Formulário */}
                <div className="w-full max-w-md">
                  <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="flex items-center px-4">
                      <Mail size={18} className="text-gray-500 shrink-0" />
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-3 h-12 text-base text-white placeholder:text-gray-500 bg-transparent border-none rounded-none focus:outline-none focus:ring-0"
                      />
                    </div>
                    <Separator className="bg-gray-700 m-0" />
                    <div className="flex items-center px-4">
                      <Lock size={18} className="text-gray-500 shrink-0" />
                      <Input
                        type="password"
                        placeholder="Senha"
                        className="w-full px-3 py-3 h-12 text-base text-white placeholder:text-gray-500 bg-transparent border-none rounded-none focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <Button className="w-full mt-5 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl">
                    Conectar
                  </Button>

                  <div className="mt-5 text-center">
                    <h1
                      className="text-base font-bold text-blue-400 cursor-pointer"
                      onClick={() => handleFilterChange("opcao")}
                    >
                      Configurar Conexão
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                      Toque para alterar o modo de conexão
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-auto pt-6 text-center text-sm text-gray-600">
                <p>© 2026 Seu App. Todos os direitos reservados.</p>
              </footer>
            </div>
          </>
        ) : (
          <ConfigConnection onBack={() => handleFilterChange("home")} />
        )}
      </div>
    </Card>
  );
}
