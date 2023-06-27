<template>
	<div>
		<h1>test</h1>
		<button @click="fe()">click</button>
		<div>
			<form @submit.prevent="fe">
				<div>
					<label for="name">Nom</label>
					<input type="text" id="name">
				</div>
				<div>
					<label for="firstname">Prénom</label>
					<input type="text" id="firtname">
				</div>
				<div>
					<label for="mail">Email</label>
					<input type="email" id="mail">
				</div>
				<div>
					<label for="age">Age</label>
					<input type="number" id="age">
				</div>
				<div>
					<label for="adress">adress</label>
					<input type="text" id="adress">
				</div>



				<input type="submit" value="Go" />
			</form>
		</div>
	</div>
</template>
<script>
import graphql from '../utils/graphql.js'
export default {
	data() {
		return {
			test: {}
		}
	},

	methods: {
		fe() {
			graphql(`
			{
				Artiste {
					IdArtiste
					pseudo
					idStyle
				}
			}
			`)
		}
	}
}
</script>