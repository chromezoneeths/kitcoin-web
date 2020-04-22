<script>
  export default {
    tag: "kitcoin-logo",
    props: ["loading"]
  };
  loading: document.getElementById("loading-ring").classList = [
    "abs",
    loading ? "rotating" : "returning"
  ];
</script>

<style>
  .abs {
    position: absolute;
  }
</style>

<svelte:options tag="kitcoin-logo" />
<main>
  <img src="kitcoin-k.svg" class="abs" alt="Kitcoin logo" />
  <img
    src="kitcoin-ring.svg"
    id="loading-ring"
    class="abs"
    alt="Kitcoin logo" />
</main>
