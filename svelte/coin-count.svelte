<script>
  export default {
    tag: "coin-count",
    props: ["count"]
  };
  // let count;
  // // setTimeout(update, 500);
  // // async function update() {
  // //   if (window.lkc) {
  // //     if (window.logged_in) {
  // //       console.log("Trying to update kitcoin count...");
  // //       count = (await window.lkc.balance()).toString();
  // //       setTimeout(update, 60000);
  // //     } else {
  // //       console.log("Couldn't update since we're not logged in yet");
  // //       setTimeout(update, 10);
  // //     }
  // //   }
  // // }
</script>

<svelte:options tag="coin-count" />
<main>
  <link rel="stylesheet" href="/ui/semantic.min.css" />
  <div class="ui inverted mini statistic" style="padding:0">
    <div class="value">{count || '???'}</div>
    <div class="label">kitcoin</div>
  </div>
</main>
