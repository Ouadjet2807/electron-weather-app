module.exports = {
  packagerConfig: {
    asar: true,
    icon: './src/icons/mac/icon.icns'
  },
  rebuildConfig: {
    icon: './src/icons/mac/icon.icns'
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {setupIcon: './src/icons/mac/icon.icns'},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: { options: {
          icon: './src/icons/mac/icon.icns'
        }},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {icon: './src/icons/mac/icon.icns'},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {icon: './src/icons/mac/icon.icns'},
    },
  ],
};
