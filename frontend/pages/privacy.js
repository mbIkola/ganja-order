import React from 'react';
import Link from 'next/link';
import {createGlobalStyle} from 'styled-components';
import {Button, Card, Elevation} from '@blueprintjs/core';

import Container from '../components/form/container';

const GlobalStyle = createGlobalStyle`
	body {
		background-image: url("https://cdn.shopify.com/s/files/1/1820/8835/files/SWISSX-LOGO-MAIN_450x.png?v=1493741277");
		background-size:  64px;
		background-repeat: no-repeat;
	}
`;

const Privacy = () => {
	return (
		<Container>
			<Card elevation={Elevation.FOUR}>
				<h1 style={{fontSize: '2rem', textAlign: 'center'}}>Privacy Policy</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tu istuc dixti bene Latine, parum plane. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Minime vero istorum quidem, inquit. Cupiditates non Epicuri divisione finiebat, sed sua satietate. In quibus doctissimi illi veteres inesse quiddam caeleste et divinum putaverunt. </p>

				<p>Ergo in utroque exercebantur, eaque disciplina effecit tantam illorum utroque in genere dicendi copiam. Hoc est non modo cor non habere, sed ne palatum quidem. Nec lapathi suavitatem acupenseri Galloni Laelius anteponebat, sed suavitatem ipsam neglegebat; Itaque primos congressus copulationesque et consuetudinum instituendarum voluntates fieri propter voluptatem; Quos nisi redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est. Cur ipse Pythagoras et Aegyptum lustravit et Persarum magos adiit? Rationis enim perfectio est virtus; Idem iste, inquam, de voluptate quid sentit? Itaque sensibus rationem adiunxit et ratione effecta sensus non reliquit. Nam si quae sunt aliae, falsum est omnis animi voluptates esse e corporis societate. </p>

				<p>Si qua in iis corrigere voluit, deteriora fecit. Hoc ne statuam quidem dicturam pater aiebat, si loqui posset. Ita cum ea volunt retinere, quae superiori sententiae conveniunt, in Aristonem incidunt; Tecum optime, deinde etiam cum mediocri amico. Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Dicam, inquam, et quidem discendi causa magis, quam quo te aut Epicurum reprehensum velim. </p>

				<p>Duo Reges: constructio interrete. Amicitiam autem adhibendam esse censent, quia sit ex eo genere, quae prosunt. Si enim ita est, vide ne facinus facias, cum mori suadeas. Quo modo autem philosophus loquitur? </p>

				<p>Ex rebus enim timiditas, non ex vocabulis nascitur. Sed virtutem ipsam inchoavit, nihil amplius. Cum sciret confestim esse moriendum eamque mortem ardentiore studio peteret, quam Epicurus voluptatem petendam putat. Quod autem principium officii quaerunt, melius quam Pyrrho; Vestri haec verecundius, illi fortasse constantius. Propter nos enim illam, non propter eam nosmet ipsos diligimus. Nam Pyrrho, Aristo, Erillus iam diu abiecti. Longum est enim ad omnia respondere, quae a te dicta sunt. Nihil ad rem! Ne sit sane; </p>

				<p>Habes, inquam, Cato, formam eorum, de quibus loquor, philosophorum. Eadem nunc mea adversum te oratio est. Equidem soleo etiam quod uno Graeci, si aliter non possum, idem pluribus verbis exponere. Unum est sine dolore esse, alterum cum voluptate. Nec vero alia sunt quaerenda contra Carneadeam illam sententiam. Quod cum dixissent, ille contra. Atqui eorum nihil est eius generis, ut sit in fine atque extrerno bonorum. Tenent mordicus. Ut nemo dubitet, eorum omnia officia quo spectare, quid sequi, quid fugere debeant? Quid enim tanto opus est instrumento in optimis artibus comparandis? </p>
				<br/>
				<div style={{textAlign: 'center'}}>
					<Link prefetch href="/">
						<Button>Go back</Button>
					</Link>
				</div>

			</Card>
			<GlobalStyle/>
		</Container>
	);
};

export default Privacy;
