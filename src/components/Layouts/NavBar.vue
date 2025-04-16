<template>
	<nav class="navbar is-transparent is-link" role="navigation" aria-label="main navigation">
		<div class="container is-max-desktop px-2">
			<div class="navbar-brand">
				<RouterLink to="/" class="navbar-item is-size-4 is-family-sans-serif has-text-weight-bold">NotesApp</RouterLink>

				<a @click.prevent="mostrarNavMobile = !mostrarNavMobile" role="button" class="navbar-burger" :class="{ 'is-active -white': mostrarNavMobile }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref="navBarBurgerRef">
					<span aria-hidden="true" class="has-background-white"></span>
					<span aria-hidden="true" class="has-background-white"></span>
					<span aria-hidden="true" class="has-background-white"></span>
					<span aria-hidden="true" class="has-background-white"></span>
				</a>
  		</div>

			<div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': mostrarNavMobile }" ref="navBarMenuRef">
				<div class="navbar-end">
					<RouterLink @click="mostrarNavMobile = false" to="/" class="navbar-item">Anotações</RouterLink>
					<RouterLink @click="mostrarNavMobile = false" to="/stats" class="navbar-item">Stats</RouterLink>
					<RouterLink @click="mostrarNavMobile = false" to="/auth" class="navbar-item" v-if="!storeAuth.usuario.id" >Auth</RouterLink>
					<RouterLink @click="mostrarNavMobile = false; storeAuth.logout()" to="/auth" class="navbar-item" v-if="storeAuth.usuario.id">Logout</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { ref } from 'vue';	
	import { RouterLink } from 'vue-router';
	import { onClickOutside } from '@vueuse/core';
	import { useStoreAuth } from '@/stores/storeAuth';

	const storeAuth = useStoreAuth()

	const mostrarNavMobile = ref(false)

	const navBarMenuRef = ref(null)
	const navBarBurgerRef = ref(null)

	onClickOutside(navBarMenuRef, () => mostrarNavMobile.value = false, {
		ignore: [navBarBurgerRef]
	})
</script>

<style>
@media (max-width: 1023px) {
	.navbar-menu {
		position: absolute;
		left: 0;
		width: 100%;
	}
}
</style>