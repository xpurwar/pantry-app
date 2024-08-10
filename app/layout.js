// import { Inter } from "next/font/google";
// import "./globals.css";

// export const metadata = {
//   title: "Pantry Stock",
//   description: "Created by Ananya Purwar",
// };

// export default function RootLayout({ children }) {
//   return (
//     <FirebaseAppProvider firebaseConfig={firebaseConfig}>
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//     </FirebaseAppProvider>
//   );
// }

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry App",
  description: "Ananya Purwar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
