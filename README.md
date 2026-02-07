# Digital Asset Manager (Frontend)

A comprehensive frontend application for managing digital assets, users, and assignments. Built with modern web technologies to provide a seamless and performant user experience.

## ✨ Key Features

This application includes a wide range of features to support asset lifecycle management:

*   **🔐 Authentication & Security**:
    *   Secure login with JWT token management (Silent Refresh).
    *   Role-based access control (Admin/Employee).
    *   Automatic session handling and redirection.

*   **📊 Dashboard**:
    *   Visual overview of asset statistics.
    *   Tracking of total assets, available assets, and assigned assets.

*   **📦 Asset Management**:
    *   **Create Assets**: Add new assets with dynamic metadata fields.
    *   **View & Edit**: detailed view of asset information and metadata.
    *   **Delete**: Soft delete or permanent removal based on policy.
    *   **Asset Types**: Configure and manage different categories of assets.

*   **busts_in_silhouette: User Management**:
    *   **User List**: View and search through registered users.
    *   **Create User**: Admin can create new user accounts.
    *   **Account Status**: Lock or unlock user accounts as needed.

*   **📝 Asset Assignment**:
    *   **Assign Assets**: Allocate assets to specific employees.
    *   **Recovery**: Process for returning/recovering assets from employees.
    *   **History**: Track assignment history for auditing.

*   **📈 Reporting & Logs**:
    *   **System Logs**: View comprehensive system activity logs.
    *   **Reports**: Generate and view property reports based on status, category, etc.

*   **🎨 UI/UX**:
    *   **Responsive Design**: Optimized for various screen sizes.
    *   **Theming**: Built-in Light and Dark mode support.
    *   **Interactive Components**: Uses Shadcn UI for accessible and beautiful components.

## 🛠️ Technology Stack

The project is built using a robust stack of modern technologies:

*   **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
*   **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) (Validation)
*   **HTTP Client**: [Axios](https://axios-http.com/)
*   **Utilities**: `date-fns` (Date formatting), `lucide-react` (Icons), `sonner` (Toast notifications)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/digital-asset-manager-fe.git
    cd digital-asset-manager-fe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Configuration

The API URL configuration is located in `src/utils/constant.ts`.
By default, it points to `http://localhost:3007/` for local development.

Open `src/utils/constant.ts` to modify the `BASE_URL_LOCAL` or `BASE_URL_PRODUCTION` if needed.

```typescript
export const BASE_URL_LOCAL = "http://localhost:3007/";
export const BASE_URL_PRODUCTION = "https://your-production-api.com/";
```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The output will be in the `.next` directory.

## 📂 Project Structure

A quick look at the top-level directory structure:

```
src/
├── apis/           # API service functions (AssetService, AuthService, etc.)
├── app/            # Next.js App Router pages and layouts
│   ├── (auth)/     # Authentication routes (login, register)
│   ├── (main)/     # Main application routes (home, profile, etc.)
│   ├── dashboard/  # Dashboard specific routes and components
│   └── ...
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks (useAsset, useAuth, etc.)
├── lib/            # Library configurations (axiosInstance, react-query, etc.)
├── store/          # Zustand state stores
├── templates/      # Page templates or larger composite components
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and constants
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
