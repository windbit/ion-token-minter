import React from "react";
import { Box, Typography } from "@mui/material";
import { HoverableIcon } from "components/hoverableIcon/HoverableIcon";
import {
  ContributedWrapper,
  CredentialsWrapper,
  FooterLink,
  FooterTextBoxLeft,
  FooterTextBoxRight,
  FooterWrapper,
  Separator,
  SocialsContent,
  SocialsWrapper,
} from "./styled";
import github from "assets/icons/github.svg";
import githubHovered from "assets/icons/github-hover.svg";
import { Outlet } from "react-router-dom";
import { useNetwork } from "../../lib/hooks/useNetwork";
import { JETTON_DEPLOYER_WEBCLIENT_GITHUB } from "consts";

export const Footer = () => {
  const { network } = useNetwork();

  let isTestnet = network === "testnet";
  let switchNetworkText = isTestnet ? "Switch to Mainnet" : "Switch to Testnet";
  let switchNetworkURL = isTestnet ? "/" : "/?testnet=true";

  return (
    <FooterWrapper>
      <SocialsWrapper>
        <Box></Box>
        <SocialsContent>
          <HoverableIcon
            iconUrl={github}
            hoveredIconUrl={githubHovered}
            link={JETTON_DEPLOYER_WEBCLIENT_GITHUB}
          />
        </SocialsContent>
      </SocialsWrapper>
      <Separator />
      <CredentialsWrapper>
        <FooterTextBoxLeft>
          <Typography variant="body2">© {new Date().getFullYear()} WindBit</Typography>
        </FooterTextBoxLeft>
        <ContributedWrapper />
        <FooterTextBoxRight>
          <FooterLink target="_blank" href={switchNetworkURL}>
            <Typography variant="body2">{switchNetworkText}</Typography>
          </FooterLink>
        </FooterTextBoxRight>
      </CredentialsWrapper>
      <Outlet />
    </FooterWrapper>
  );
};
