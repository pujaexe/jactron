import * as React from 'react';
import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';
import ConnectWalletButton from '../components/plasmic/jacktron/ConnectWalletButton';


// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// registerComponent(...)


registerComponent(ConnectWalletButton, {
  name: "ConnectWalletButton",
  props: {},
  importPath: './components/plasmic/jacktron/ConnectWalletButton',
});

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
