<template>
	<div>
		<h1>Bienvenue au concert de {{ selectConcert.IdArtiste_Artiste.pseudo }}</h1>
		<p>Nous sommes le {{ selectConcert.idConcert_Concert.dateConcert }} à {{
			selectConcert.idConcert_Concert.idVille_Ville.nom }}</p>
		<div>
			<form @submit.prevent="createVisitor">
				<div>
					<label for="name">Nom</label>
					<input type="text" id="name" v-model="user.name" />
				</div>
				<div>
					<label for="firstname">Prénom</label>
					<input type="text" id="firtname" v-model="user.firstname" />
				</div>
				<div>
					<label for="mail">Email</label>
					<input type="email" id="mail" v-model="user.email" />
				</div>
				<div>
					<label for="age">Age</label>
					<input type="number" id="age" v-model="user.age" />
				</div>
				<div>
					<label for="adress">adresse</label>
					<input type="text" id="adress" v-model="user.adress" />
				</div>
				<div>
					<label for="city">Ville</label>
					<select name="city" id="city" v-model="user.cityId" :key="componentKey">
						<option value="">--Please choose an option--</option>
						<option v-for="city in cities" :value="city.idVille" :key="city.value">
							{{ city.nom }}
						</option>
					</select>
				</div>
				<div>
					<label for="parrain">Parrain</label>
					<select name="parrain" id="parrain" v-model="user.idParrain" :key="componentKey">
						<option value="">--Please choose an parrain--</option>
						<option v-for="visitor in visitors" :value="visitor.idVisiteur" :key="visitor.idVisiteur">
							{{ visitor.prenom }} {{ visitor.nom }}
						</option>
					</select>
				</div>

				<input type="submit" value="Go" />
			</form>

			<button @click="camera">show camera</button>
			<button @click="takePhoto">take a picture</button>
			<video autoplay :srcObject="stream"></video>
			<canvas></canvas>
			<img :src="photo" />
		</div>
	</div>
</template>
<script>
import getGraphql from '../utils/graphql.js'
export default {
	setup() {
		return {

		}
	},

	data() {
		return {
			cities: [],
			visitors: [],
			concerts: [],
			selectConcert: {},
			user: {
				name: "",
				firstname: "",
				email: "",
				age: 0,
				adress: "",
				cityId: 0,
				idParrain: 0,
				image64: ""
			},
			componentKey: 0,
			stream: {},
			imageCapture: {},
			photo: "",
		}
	},

	async created() {
		fe() {
		const citiesResponse = await getGraphql(`
			{
				Ville {
					idVille
					nom
					coordonnees
				}
			}
			`)

		this.cities = citiesResponse.data.Ville

		const visitorsResponse = await getGraphql(`
			{
				Visiteur {
				idVisiteur
				nom
				prenom
				}
			}
			`)

		this.visitors = visitorsResponse.data.Visiteur

		const concertsResponse = await getGraphql(`
		{
			Realise {
				IdArtiste_Artiste {
					IdArtiste
					pseudo
					idStyle
				}
				idConcert_Concert {
					idConcert
					dateConcert
					nbrPlaceDisponible
					idVille_Ville {
						nom
					}
				}
			}
		}
		`)

		this.concerts = concertsResponse.data.Realise

		const randomInt = Math.floor(Math.random() * this.concerts.length);
		this.selectConcert = this.concerts[randomInt]

		this.forceUpdate()
	},

	methods: {
		forceUpdate() {
			this.componentKey++
		},

		createVisitor() {
			console.log(this.user);

			const query = `
					mutation {
						VisiteurCreate(
							Visiteur: {
								nom: "${this.user.name}", 
								prenom: "${this.user.firstname}", 
								email: "${this.user.email}", 
								age: ${this.user.age}, 
								idVille: ${this.user.cityId}, 
								adresse: "${this.user.adress}",
								idParrain: ${this.user.idParrain},
								photo: "${this.user.image64}"
							}
						)
						{
							idVisiteur
							nom
							prenom
							email
							age
							adresse
							idParrain
							idVille
						}
					}
				`
		async camera() {
			this.stream = await navigator.mediaDevices.getUserMedia({
				video: true
			})

			this.imageCapture = new ImageCapture(this.stream.getVideoTracks()[0])
		},

		blobToBase64(blob) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result;
					resolve(base64String);
				};
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		},

		async takePhoto() {
			const blob = await this.imageCapture.takePhoto().then((blob) => {
				return blob
			})

			this.photo = URL.createObjectURL(blob)

			const b64 = await this.blobToBase64(blob)
			this.user.image64 = b64

		},
</script>