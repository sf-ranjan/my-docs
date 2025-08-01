import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
	{
		title: "Easy to Use",
		Svg: require("@site/static/img/undraw_metrics_5v8d.svg").default,
		description: <></>,
	},
	{
		title: "Focus on What Matters",
		Svg: require("@site/static/img/undraw_artist-focuss.svg").default,
		description: <></>,
	},
	{
		title: "Powered by Ideas",
		Svg: require("@site/static/img/undraw_learning_ideas.svg").default,
		description: <></>,
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
