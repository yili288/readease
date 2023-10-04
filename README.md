**File structure** 
1. ```src/components``` : contains reusable UI or small sections of the user interface. 
2. ```src/navigation``` : contains the logic to move between screens. 
3. ```src/screens``` : contains large components, similar to a web page each file in here represents an entire mobile phone screen. 
4. ```src/utils``` : for utility functions or any function not related to rendering components or functions that can be used by multiple components.

The ```package.json``` file contains all the dependencies and modules/libraries the app requires.

**Getting Started**

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

**Step 1: Start the Metro Server**

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start
```

**Step 2: Start your Application**

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
# using Yarn for Android
yarn android

or

# using Yarn for iOS
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

**Step 3: Hot Reloading**

Now that you have successfully run the app, here is how to quickly build and run your changes on the emulator or phone and see your changes quickly.

1. Open `App.tsx` in VS Code and edit some lines.
2. Save the file.
3. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd>) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS) or shake your phone!
