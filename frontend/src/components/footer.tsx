import SocialHandles from "./social-handles";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 py-6 px-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              className="h-8 w-8 mr-3 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="text-xl font-bold">blogs and blogs</span>
          </div>

      <SocialHandles/>
        </div>
      </div>
    </footer>
  );
}
