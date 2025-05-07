// Shared Kore.ai bot initialization
var chatConfig = KoreChatSDK.chatConfig;
var chatWindow = KoreChatSDK.chatWindow;
var chatWindowInstance = new chatWindow();
var BrowserTTSPlugin = BrowserTTSPluginSDK.BrowserTTS;
var Korei18nPlugin = Korei18nPluginSDK.Korei18nPlugin;
var WebKitSTTPlugin = WebKitSTTPluginSDK.WebKitSTT;
chatWindowInstance.installPlugin(new Korei18nPlugin());

fetch('/api/customer')
  .then(res => res.json())
  .then(customer => {
    KoreChatSDK.chatConfig.botOptions.botInfo.customData = { customer };

    // Then launch the chat
    new KoreChatSDK.chatWindow().show(KoreChatSDK.chatConfig);
  })
  .catch(error => {
    console.error('Error loading customer data:', error);
  });



var botOptions = chatConfig.botOptions;
botOptions.koreAPIUrl = "https://platform.kore.ai/api/";
botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = "shivani0reddy@gmail.com";
botOptions.botInfo = { name: "Reactive_POC", _id: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd"};
botOptions.clientId = "cs-de247d47-4b00-54b7-9261-eddaa39a754e";
botOptions.clientSecret = "e5WPiFqgun567KGjzq2LoUqvwnULI2q48/DrJnxdK1Q=";
//botOptions.brandingAPIUrl = botOptions.koreAPIUrl + 'websdkthemes/' + botOptions.botInfo._id + '/activetheme';
botOptions.enableThemes = true;
KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = "9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd";
KoreChatSDK.chatConfig.botOptions.openSocket = true;   // Web‑socket kept open
KoreChatSDK.chatConfig.pwcConfig = { enable: true };  // enable PWC engine
// var AgentDeskTopPlugin = AgentDeskTopPluginSDK.AgentDesktopPlugin;
// chatWindowInstance.installPlugin(new AgentDesktopPlugin());
// var ProactiveWebCampaignPlugin =
// ProactiveWebCampaignPluginSDK.ProactiveWebCampaignPlugin;
// chatWindowInstance.installPlugin(
//         new ProactiveWebCampaignPlugin({ dependentPlugins: { AgentDesktopPlugin: true }})
//   );

const AgentDesktopPlugin =
        (window.AgentDeskTopPluginSDK &&          // v11.11.x  (DeskTop‑case!)
         window.AgentDeskTopPluginSDK.AgentDesktopPlugin)
     || window.AgentDeskTopPlugin;                // fallback for future builds

/* ---- Safety check ------------------------------------------------------- */
if (typeof AgentDesktopPlugin !== 'function') {
  console.error('Agent‑Desktop plugin still missing – check filename / load order');
} else {
  chatWindowInstance.installPlugin(new AgentDesktopPlugin());
}

/* Proactive Web Campaign depends on Agent‑Desktop */
const ProactiveWebCampaignPlugin =
        window.ProactiveWebCampaignPlugin ??
        (window.ProactiveWebCampaignPluginSDK &&
         window.ProactiveWebCampaignPluginSDK.ProactiveWebCampaignPlugin);

if (ProactiveWebCampaignPlugin) {
  console.log(window.ProactiveWebCampaignPlugin);
  chatWindowInstance.installPlugin(
      new ProactiveWebCampaignPlugin({ dependentPlugins: { AgentDesktopPlugin: true }})
  );
}

// KoreChatSDK.chatConfig.botOptions.botInfo.customData = { customer };
chatConfig.i18n = { defaultLanguage: "fr" };
chatWindowInstance.plugins.Korei18nPlugin.config = { availableLanguages: ['fr'], defaultLanguage:'fr', languageStrings:{ fr: { message:'Message...' }}};
chatConfig.branding.chat_bubble.style = "rounded";
chatWindowInstance.show(KoreChatSDK.chatConfig);