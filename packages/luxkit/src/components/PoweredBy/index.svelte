<script lang="ts">
  import { _ as t } from "svelte-i18n";
  let className = "";
  export { className as class };
</script>

<div class={`tip ${className}`}>
  <a href="https://luxkit.luxwallet.xyz" target="_blank" rel="noreferrer"
    >{$t("Powered by LuxKit")}</a
  >
</div>

<style lang="scss">
  .tip {
    display: block;

    text-align: center;
    font-size: 12px;
    color: var(--r-neutral-foot);

    & > a {
      color: var(--r-neutral-foot);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
