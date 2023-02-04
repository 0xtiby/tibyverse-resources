import Layout from "../components/Layout";
import { useIsMounted } from "../hooks/useIsMounted";
import { useNetwork } from "wagmi";

export function withChainControl<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (
    props: Omit<T, keyof Record<string, unknown>>
  ) => {
    const mounted = useIsMounted();
    const { chain } = useNetwork();

    if (!mounted) {
      return null;
    }

    // props comes afterwards so the can override the default ones.
    return (
      <Layout>
        {chain?.unsupported ? (
          <p className="font-bold text-red-500">
            Unsupported Network. Please change network.
          </p>
        ) : (
          <WrappedComponent {...(props as T)} />
        )}
      </Layout>
    );
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
