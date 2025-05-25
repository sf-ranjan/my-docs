import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Welcome to BigOwl",
	tagline: "Furthering the Future of AI",
	favicon: "img/favicon.svg",

	// Set the production url of your site here
	url: "https://sf-ranjan.github.io",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",
	deploymentBranch: "gh-pages",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "sf-ranjan", // Usually your GitHub org/user name.
	projectName: "my-doc", // Usually your repo name.
	trailingSlash: false,

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	markdown: {
		mermaid: true,
	},
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: "./sidebars.js",
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex],
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					//editUrl:'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: {
					showReadingTime: true,
					routeBasePath: "/blog",
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					onInlineTags: "warn",
					onInlineAuthors: "warn",
					onUntruncatedBlogPosts: "warn",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: "img/Copy_of_BigOwl_Logo.png",
			navbar: {
				title: "",
				logo: {
					alt: "Logo",
					src: "img/BigOwlLogo.svg",
				},
				items: [
					{
						type: "docSidebar",
						sidebarId: "authorSidebar",
						position: "left",
						label: "About Us",
					},
					{
						type: "docSidebar",
						sidebarId: "tutorialSidebar",
						position: "left",
						label: "Documentation",
					},
					{ to: "/blog", label: "Blog", position: "left" },
					{
						href: "https://github.com/sf-ranjan",
						label: "GitHub",
						position: "right",
					},
					{
						href: "https://deepranjan.bigowl.co.in",
						label: "Author",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [],
				copyright: `© ${new Date().getFullYear()} BigOwl and other contributors`,
			},
			mermaid: {
				theme: { light: "neutral", dark: "dark" },
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ["latex"],
			},
		}),
	stylesheets: [
		{
			href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
			type: "text/css",
			rel: "stylesheet",
		},
	],
	stylesheets: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
	stylesheets: [
		{
			href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
			type: "text/css",
			integrity: "sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+",
			crossorigin: "anonymous",
		},
	],
	themes: [
		"@docusaurus/theme-mermaid",
		// ... Your other themes.
		[
			require.resolve("@easyops-cn/docusaurus-search-local"),
			//require.resolve("@docusaurus/theme-mermaid"),
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			({
				// ... Your options.
				// `hashed` is recommended as long-term-cache of index file is possible.
				hashed: true,

				// For Docs using Chinese, it is recomended to set:
				// language: ["en", "zh"],

				// If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
				// forceIgnoreNoIndex: true,
			}),
		],
	],
};

export default config;
