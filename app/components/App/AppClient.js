import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

//messenger
import * as firebase from 'firebase'
import { messaging, firestore } from "../../configs/firebase";

import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {

    useEffect(() => {
        const askForPermissioToReceiveNotifications = async () => {
            try {   
                await messaging.requestPermission();
                const token = await messaging.getToken();
                let checkTokenExisted = await localStorage.getItem("FCM_TOKEN");
                if (!checkTokenExisted) {
                    localStorage.setItem("FCM_TOKEN", token);
                    let objectPushNoti = {
                        id: "id generate",
                        fcmToken: token,
                        createTime: new Date()
                    }
                    firestore.collection("BROWSER_FCM_TOKEN").add(objectPushNoti);
                }
                return token;
            } catch (error) {
                console.error(error);
            }
        }

        askForPermissioToReceiveNotifications();


        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (message) => {
                console.log("message::: ", message)
                notification["success"]({
                    message: message.data["firebase-messaging-msg-data"].notification.title,
                    description: message.data["firebase-messaging-msg-data"].notification.body,
                });
            });
            navigator.serviceWorker
                .register("../../firebase-messaging-sw.js")
                .then(function (registration) {
                    console.log("Registration successful, scope is:", registration.scope);
                    messaging.useServiceWorker(registration);
                    messaging.onMessage((payload) => {
                        const title = payload.notification.title;
                        const options = {
                            body: payload.notification.body,
                            icon: payload.notification.icon,
                            actions: [
                                {
                                    action: payload.fcmOptions.link,
                                    title: 'Testing title '
                                }
                            ]
                        };
                        registration.showNotification(title, options);
                    });
                })
                .catch(function (err) {
                    console.log("Service worker registration failed, error:", err);
                });
            messaging.onMessage((payload) => console.log('Message received. ', payload));
        }


    }, []);



    return (
        <Router basename={basePath}>
            <AppLayout>
                <RoutedContent />
            </AppLayout>
        </Router>
    );
}

export default hot(module)(AppClient);