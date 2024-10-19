with import <nixpkgs> {};

stdenv.mkDerivation rec {
    name = "env";

    #src = ./.;

    # Customizable development requirements
    nativeBuildInputs = [
        git
        gnused
        gcc
        opam m4
        pkg-config
        gnumake
        autoconf automake libtool
        curl
        jq
        tmux
        postgresql_16

        cacert
        corepack_22
        nodejs_22

        nodePackages_latest.vercel
        nodePackages_latest.pnpm
        nodePackages_latest.prisma
    ];

    buildInputs = [
        openssl
        zlib
    ];

    shellHook = ''
      echo 'nixified environment'
    '';

   env = {
        PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
        PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
        PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
   };

}

