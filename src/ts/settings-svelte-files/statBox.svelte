
<script lang="ts">
	import { ValueComponent } from "obsidian";

    let name: string 
    let score: number
    let modifier: number

    function calculateMod() {
        modifier = Math.floor(score/2)-5
    }
    
</script>

<div id="${name}" class="ability-stat">
    <label for="${name}"></label>
    <input class="ability-score" type="number" value="${score}" on:change={calculateMod}>
    <input class="ability-modifier" type="number" value="${modifier}">

</div>
<input type=number aria-label="${name}" value="${score}">

