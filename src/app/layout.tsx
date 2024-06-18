import {AuthContextProvider} from "@/context/AuthContext";
import '@/style/global.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const metadata = {
  title: 'JobsDB Scraping',
  description: 'Venturenix JobsDB Scraping',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
    </body>
    </html>
  )
}
