import React from 'react';
import {AppState, Platform, BackHandler, Linking, Alert} from 'react-native';
import {create} from 'mobx-persist';
// import CodePush from 'react-native-code-push';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
// import SplashScreen from 'react-native-splash-screen';

// import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-community/async-storage';

// import { clearNotification } from './Notification';

// import { getMessagingToken, registerFirebasePush } from '~shared/FirebaseManager';
import {getColor, makeToast, AsyncAlert} from '~shared/Common';
// import { requestUpdateMemberFcmToken, requestInsertNonMemberFcmToken } from '~shared/Api';

import LoadingOverlay, {
  setVisibleLoading,
  LOADING_OVERLAY_ID,
} from '~ui/LoadingOverlay';

// import { accountConnectStore } from '~stores/AccountConnectStore';
// 홈
// import AnimatedSplash from '~screens/Start/AnimatedSplash';

import Login from '~screens/Start/Login';
import PurchaseVehicle from '~screens/Start/PurchaseVehicle';
import RegisterForSale from '~screens/Start/RegisterForSale';
import SettingsMain from '~screens/Start/SettingsMain';

// import { hasLocationPermission, hasPermissionsWithoutLocation } from '~shared/PermissionManager';
// import { checkAppVersion } from './UpdateManager';
// import config from 'config';

export const registerScreens = client => {
  // !!! 주의사항 !!! 제스쳐에 문제가 있을때, 세번째 파라미터 willUseGesture true로 설정할 것.
  // Start
  // registerComponent('AnimatedSplash', AnimatedSplash);
  // getMessagingToken();

  registerComponent('Login', Login);
  registerComponent('PurchaseVehicle', PurchaseVehicle);
  registerComponent('RegisterForSale', RegisterForSale);
  registerComponent('SettingsMain', SettingsMain);

  Navigation.registerComponent('LoadingOverlay', () => LoadingOverlay);

  // Navigation.registerComponent('Overlay', () => Overlay);
};

// function checkCodePushUpdate() {
//   return CodePush.sync({
//     updateDialog: false,
//     // checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
//     installMode: CodePush.InstallMode.IMMEDIATE,
//     rollbackRetryOptions: {
//       delayInHours: 1,
//       maxRetryAttempts: 20,
//     },
//   });
// }

/**
 * 1. 앱시작 - RNN
 */
export const AppStartRNN = () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    try {
      console.debug('AppStartRNN');
      setNavigationDefaultOptions();
      registerScreens();

      // const updateInfo = await getUpdateInfomation();
      await AppStartCodePush();

      // if (updateInfo.isNeedUpdate) {
      //   let isPressedOK = false;
      //   if (updateInfo.isNeedForceUpdate) {
      //     isPressedOK = await AsyncAlert(null, '새 버전이 출시되었습니다. 업데이트 후 이용해주세요.', '확인');
      //   } else {
      //     isPressedOK = await AsyncAlert(null, '새 버전이 출시되었습니다. 업데이트하시겠습니까?', '확인', '취소');
      //   }

      //   if (isPressedOK) {
      //     Linking.openURL(updateInfo.storeUrl).catch((err) => {
      //       console.debug(err);
      //     });
      //   }

      //   SplashScreen.show();
      // }
    } catch (error) {
      console.info(
        `error AppStartRNN > registerAppLaunchedListener [${error}]`,
      );
    }
  });

  Navigation.events().registerCommandListener((name, params) => {
    console.debug(
      `registerCommandListener name ${name}, params ${JSON.stringify(params)}`,
    );
    if (
      name === 'showOverlay' &&
      params.layout &&
      params.layout.id === LOADING_OVERLAY_ID
    ) {
      setVisibleLoading(true);
    } else if (
      name === 'dismissOverlay' &&
      params.componentId === LOADING_OVERLAY_ID
    ) {
      setVisibleLoading(false);
    }
  });

  Navigation.events().registerScreenPoppedListener(({componentId}) => {
    console.debug('registerScreenPoppedListener componentId', componentId);
  });
};

/**
 * 2. 앱시작 - CodePush
 */
const AppStartCodePush = async () => {
  console.debug('AppStartCodePush > Start');

  // if (__DEV__) {
  AppStart();
  return;
  // }

  try {
    // if (config.IOS_TEST_MODE) {
    // const statusNameArray = [
    //   'UP_TO_DATE',
    //   'UPDATE_INSTALLED',
    //   'UPDATE_IGNORED',
    //   'UNKNOWN_ERROR',
    //   'SYNC_IN_PROGRESS',
    //   'CHECKING_FOR_UPDATE',
    //   'AWAITING_USER_ACTION',
    //   'DOWNLOADING_PACKAGE',
    //   'INSTALLING_UPDATE',
    // ];
    // if (Platform.OS === 'ios') {
    //   SplashScreen.hide(); //FIXME: 추후 삭제
    // }

    // }
    // let syncStatus = await CodePush.sync(
    //   {
    //     updateDialog: false,
    //     // checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    //     installMode: CodePush.InstallMode.IMMEDIATE,
    //     rollbackRetryOptions: {
    //       delayInHours: 1,
    //       maxRetryAttempts: 20,
    //     },
    //   },
    //   async (status) => {
    //     if (
    //       status &&
    //       status === CodePush.SyncStatus.DOWNLOADING_PACKAGE &&
    //       currentScreen?.componentNameWithoutOverlay !== 'UpdateScreen'
    //     ) {
    //       // Alert.alert('UpdateScreen');
    //       // setRoot('UpdateScreen');
    //     }
    //     // console.log('status :: ', status, statusNameArray[status]);
    //   },
    //   (downloadProgress) => {
    //     if (currentScreen?.componentNameWithoutOverlay === 'UpdateScreen') {
    //       console.log('downloadProgress :: ', downloadProgress);
    //       Navigation.updateProps(currentScreen.componentIdWithoutOverlay, { downloadProgress });
    //     }
    //   },
    // );

    // switch (syncStatus) {
    //   case CodePush.SyncStatus.UP_TO_DATE:
    //   case CodePush.SyncStatus.UNKNOWN_ERROR:
    //   case CodePush.SyncStatus.UPDATE_IGNORED:
    //     AppStart();
    //     break;
    //   default:
    //     break;
    // }
    let syncStatus = await checkCodePushUpdate();

    AppStart();

    // let syncStatus = await checkCodePushUpdate();
    // console.info('AppStartCodePush > CodePush.sync completed with status: ', syncStatus);
    // wait for the initial code sync to complete else we get flicker
    // in the app when it updates after it has started up and is
    // on the Home screen
    // if (syncStatus === 0 || syncStatus === 2 || syncStatus === 3) {
    // }
  } catch (error) {
    console.info('AppStartCodePush > CodePush.sync error: ', error);

    // if (__DEV__ && String(error).includes('Error: 400')) {
    //   // DEBUG는 cp가 없다. 무시.
    // } else {
    //   console.info('AppStartCodePush > CodePush.sync error: ', error);
    // }
    // this could happen if the app doesn't have connectivity
    // just go ahead and start up as normal
    AppStart();
  }
};

/**
 * 3. 앱시작 - 스크립트
 */
function AppStart() {
  console.debug('Start: AppStart');

  AppState.addEventListener('change', currentAppState => {
    console.debug(
      'Start: onAppStateChange: currentAppState: ' + currentAppState,
    );
    if (currentAppState === 'active') {
      // checkCodePushUpdate(); // 임시주석. 확인후 삭제하든 처리하자.
      // clearNotification();
    }
  });

  // registerScreens();
  // setRoot('AnimatedSplash');

  (async () => {
    // getMessagingToken();
    /**
     * 4. 앱시작 - 공통부 실행
     */
    hydrateStores().then(async () => {
      setRoot('Login');
      setRootBottomTabs();
      // SplashScreen.hide();
      // if (config.IOS_TEST_MODE && Platform.OS === 'ios') {
      //   setRoot('EnterBusinessNumber');
      //   SplashScreen.hide();

      //   return;
      // } else if (config.IS_SHOW_SYSTEM_ALERT) {
      //   // setRoot('WordCloudView');
      //   setRoot('SystemAlert');
      //   SplashScreen.hide();

      //   return;
      // }

      // let isFirstStart = (await AsyncStorage.getItem('isFirstStart')) !== 'N';
      // if (!isFirstStart) {
      //   SplashScreen.hide();
      //   setTimeout(async () => {
      //     setRoot('Dashboard');

      //     const fcmToken = await getMessagingToken();
      //     await requestUpdateMemberFcmToken(fcmToken);
      //   }, 100);
      // } else {
      //   SplashScreen.hide();
      //   setTimeout(async () => {
      //     setRoot('Preview');

      //     const fcmToken = await getMessagingToken();
      //     await requestInsertNonMemberFcmToken(fcmToken);
      //     console.log('첫 실행 **************************** fcmToken :: ', fcmToken);
      //   }, 100);
      // }
    });
  })();
}

/**
 * mobX Store 관리
 */
async function hydrateStores() {
  const hydrate = create({storage: AsyncStorage});
  // await hydrate('AccountConnectStore', accountConnectStore);

  // await hydrate('AccountConnectStore', accountConnectStore);
  // await hydrate('TestStore', testStore);
}

const registerComponent = (name, Comp, _client, willUseGesture) => {
  console.debug('registerComponent', name);
  let _Component = Comp;
  if (willUseGesture) {
    // DraggableFlatList 사용시 willUseGesture true로 설정할 것.
    _Component = gestureHandlerRootHOC(Comp);
  }
  Navigation.registerComponent(
    name,
    () => props => {
      return <_Component {...props} />;
    },
    () => _Component,
  );
};

/**
 * wix navigation 기본 설정
 */
export const setNavigationDefaultOptions = () => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: getColor('white'),
    },
    topBar: {
      visible: false,
      elevation: 0,
      noBorder: true,
      animate: false,
      title: {
        color: getColor('black'),
      },
      backButton: {
        color: getColor('gray-600'),
      },
      background: {
        color: getColor('white'),
      },
    },
    bottomTabs: {
      borderWidth: 1,
      borderColor: getColor('wr-gray-200'),
      visible: true,
    },
    bottomTab: {},

    // animations: {
    //   push: {
    //     content: {
    //       x: {
    //         interpolation: "accelerate"
    //       }
    //     }
    //   }
    // }
  });
};

/**
 * 현재 화면 Id와 Name 관리용 Object
 * registerComponentDidAppearListener를 이용해서 화면이 변경될 때 수정된다.
 */
export let currentScreen = {
  componentId: '',
  componentName: '',
  componentIdWithoutOverlay: '',
  componentNameWithoutOverlay: '',
};

/**
 * 백버튼 종료처리
 */

let exitApp = false;

const backAction = () => {
  let timeout;
  let currentpage = currentScreen.componentNameWithoutOverlay;
  console.debug(
    `[ ] backAction currentpage [${JSON.stringify(currentScreen, null, 2)}]`,
  );
  console.debug(`[ ] backAction currentpage [${currentpage}]`);

  if (currentpage === 'Dashboard') {
    if (!exitApp) {
      makeToast('이전 버튼을 한 번 더 누르시면 종료됩니다.');
      exitApp = true;
      timeout = setTimeout(
        () => {
          exitApp = false;
        },
        2000, // 2초
      );
    } else {
      clearTimeout(timeout);
      console.debug('[ ] 앱종료');
      BackHandler.exitApp(); // 앱 종료
    }
    return true;
  }
};

if (Platform.OS !== 'ios') {
  BackHandler.addEventListener('hardwareBackPress', backAction);
}

Navigation.events().registerComponentDidAppearListener(async data => {
  const {componentName, componentId} = data;

  if (componentName !== 'Overlay') {
    currentScreen.componentId = componentId;
    currentScreen.componentName = componentName;
  }

  // if (!componentName.includes('Overlay')) {
  //   await analytics().logScreenView({
  //     screen_name: currentScreen.componentNameWithoutOverlay,
  //     screen_class: currentScreen.componentNameWithoutOverlay,
  //   });

  //   currentScreen.componentIdWithoutOverlay = componentId;
  //   currentScreen.componentNameWithoutOverlay = componentName;
  // }
  console.log('registerComponentDidAppearListener', currentScreen);
});

const getTitleWithComponentName = name => {
  const titles = {
    OrderMain: '주문관리',
    OrderDetail: '주문내역 상세보기',
    RequestDelivery: '배달요청',
    Settings: '설정',
    PwdChange: '비밀번호 변경',
  };

  return titles[name];
};

/**
 * Overlay 호출용 공통 함수
 * @param String name RNN에 등록한 Screen Name
 * @param Object passProps Overlay에 넘겨줄 Props
 */
export const showOverlay = async (name, passProps) => {
  await Navigation.showOverlay({
    component: {
      name: name,
      passProps: {...passProps},
      options: {
        modalPresentationStyle: 'overFullScreen',
        layout: {
          backgroundColor: 'transparent',
          componentBackgroundColor: 'transparent',
        },
        overlay: {
          interceptTouchOutside: true,
        },
        statusBar: {
          // backgroundColor: 'transparent',
        },
      },
    },
  });
};

/**
 * modal popup 호출용 공통 함수
 * @param String name RNN에 등록한 Screen Name
 * @param Object passProps Overlay에 넘겨줄 Props
 */

export const showModalPopup = (name, passProps) => {
  Navigation.showModal({
    component: {
      name: name,
      passProps: {...passProps},
      options: {
        animations: {
          dismissModal: {
            alpha: {
              from: 1,
              to: 0,
              duration: 250,
              interpolation: {mode: 'accelerate'},
            },
            // translationY: {
            //   from: 0,
            //   to: require('react-native').Dimensions.get('window').height,
            //   duration: 150,
            //   interpolation: {mode: 'accelerate',}
            // },
          },
          showModal: {
            // alpha: {
            //   from: 0,
            //   to: 1,
            //   duration: 150,
            //   interpolation: {mode: 'accelerate',}
            // },
            // translationY: {
            //   from: require('react-native').Dimensions.get('window').height,
            //   to: 0,
            //   duration: 300,
            //   interpolation: {mode: 'accelerate',}
            // },
          },
        },
        ...Platform.select({
          ios: {
            layout: {
              componentBackgroundColor: 'transparent',
            },
            modalPresentationStyle: 'popover',
          },
          android: {
            layout: {
              componentBackgroundColor: 'transparent',
            },
            modalTransitionStyle: 'crossDissolve',
            modalPresentationStyle: 'overCurrentContext',
          },
        }),
        topBar: {
          visible: false,
          animate: true,
        },
      },
    },
  });
};

export const dismissModal = async componentId => {
  await Navigation.dismissModal(componentId);
};

/**
 * modal 호출용 공통 함수
 * {name:String, passProps:Object, title:String?}
 * title이 없을 경우 getTitleWithComponentName에서 가져온다.
 *
 * @param Object params
 */
export const showModal = params => {
  const name = params.name;
  const passProps = params.passProps;
  let title = params.title;
  if (!title) {
    title = getTitleWithComponentName(name);
  }
  let options = {
    modalPresentationStyle: 'fullScreen',
    topBar: {
      visible: false,

      title: {
        text: title,
      },
    },
  };

  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: name,
            passProps: passProps,
            options: options,
          },
        },
      ],
    },
  });
};

/**
 * Navigation Push용 공통 함수
 * {id:String, name:String, passProps:Object, title:String?, bottomTabs:Object?}
 * title이 없을 경우 getTitleWithComponentName에서 가져온다.
 * bottomTabs : bottomTabs Options
 * @param Object params
 */
export const pushComponent = params => {
  // Keyboard.dismiss();

  const id = params.id;
  const name = params.name;
  const passProps = params.passProps;
  let title = params.title;

  if (!title) {
    title = getTitleWithComponentName(name);
    console.debug(`pushComponent :: name :: ${name}, title :: ${title}`);
  }
  let options = {
    topBar: {
      title: {
        text: title,
      },
    },
  };

  const bottomTabs = params.bottomTabs;
  if (bottomTabs) {
    options.bottomTabs = bottomTabs;
  }
  (async () => {
    try {
      Navigation.push(id, {
        component: {
          name: name,
          passProps: passProps,
          options: options,
        },
      });
    } catch (error) {
      console.debug('pushComponent', error);
    }
  })();
};

/**
 * Navigation Pop 공통 함수
 * Push한 화면(이전화면)으로 돌아간다.
 * @param String props.componentId
 */
export const popComponent = componentId => {
  let id = componentId;
  if (!id) {
    id = currentScreen.componentId;
  }
  (async () => {
    try {
      await Navigation.pop(id);
    } catch (error) {
      console.debug('popComponent error', error);
    }
  })();
};

/**
 * Navigation Pop 공통 함수
 * Stack의 첫 화면으로 돌아간다.
 * @param String props.componentId
 */
export const popToRoot = componentId => {
  let id = componentId;
  if (!id) {
    id = currentScreen.componentId;
  }
  (async () => {
    try {
      await Navigation.popToRoot(componentId);
    } catch (error) {
      console.debug('popComponent error', error);
    }
  })();
};

/**
 * Navigation Root를 설정한다.
 */
export const setRoot = async (componentName, passProps) => {
  console.debug('setRoot ', componentName);

  try {
    return await Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: componentName,
                options: {
                  topBar: {
                    visible: false,
                  },
                },
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.debug(`error setRoot ${componentName}:`, error);
  }
};

export const setRootBottomTabs = async passProps => {
  try {
    const HomeSrc = require('~assets/images/bottom-tabs/ico-home-on.png');
    const Purchase = require('~assets/images/bottom-tabs/ico-purch-off.png');
    const Register = require('~assets/images/bottom-tabs/ico-regist-off.png');
    const Inquiry = require('~assets/images/bottom-tabs/ico-inq-off.png');
    const Profile = require('~assets/images/bottom-tabs/ico-my-off.png');

    const bottomTabOption = {
      iconColor: getColor('wr-gray-600'),
      selectedIconColor: getColor('black'),
      textColor: getColor('wr-gray-600'),
      selectedTextColor: getColor('black'),
    };

    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'BOTTOM_TABS_LAYOUT',
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Login',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    ...bottomTabOption,
                    text: '홈',
                    icon: HomeSrc,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'PurchaseVehicle',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    ...bottomTabOption,
                    text: '차량구매',
                    icon: Purchase,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'RegisterForSale',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    ...bottomTabOption,
                    text: '거래등록',
                    icon: Register,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'SettingsMain',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    ...bottomTabOption,
                    text: '마이페이지',
                    icon: Profile,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Login',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    ...bottomTabOption,
                    text: '관리자문의',
                    icon: Inquiry,
                  },
                },
              },
            },
          ],
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
