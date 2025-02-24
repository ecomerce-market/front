import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import NavBar from "@/components/navBar/navBar";

export const metadata: Metadata = {
  title: "MARKET MARKET",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 초기 로딩 화면 */}
        <div
          id="initial-loader"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            zIndex: 9999,
            gap: "20px",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes dots {
                0%, 20% { content: '.'; }
                40% { content: '..'; }
                60%, 100% { content: '...'; }
              }
              .loader-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 35px;
              }
              .loader {
                width: 80px;
                height: 80px;
                border: 4px solid #eef7f4;
                border-radius: 50%;
                border-top-color: #61cead;
                border-left-color: #61cead;
                animation: spin 1s linear infinite;
              }
              .loader-text {
                color: #61cead;
                font-size: 18px;
                font-weight: 600;
                letter-spacing: 1px;
              }
              .loader-text:after {
                content: '';
                animation: dots 1.5s steps(1, end) infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .market-text {
                font-size: 24px;
                font-weight: bold;
                color: #61cead;
                margin-bottom: 10px;
                animation: pulse 2s infinite;
              }
            `,
            }}
          />
          <div className="loader-container">
            <div className="market-text">MARKET MARKET</div>
            <div className="loader" />
            <div className="loader-text">잠시만 기다려주세요</div>
          </div>
        </div>

        {/* 기존 레이아웃 컴포넌트들 */}
        <Header />
        <NavBar />
        {children}

        {/* 로딩 화면을 숨기는 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('load', function() {
              const loader = document.getElementById('initial-loader');
              loader.style.opacity = '0';
              loader.style.transition = 'opacity 0.5s ease';
              setTimeout(() => {
                loader.style.display = 'none';
              }, 500);
            });
          `,
          }}
        />
      </body>
    </html>
  );
}
