import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        loginFailed : "Login failed. Please try again.",
        signin: "Sign in",
        hero1: "Find your",
        hero2: "next tour",
        hero3: "Where would you like to go ?",
        findNow: "Find now",
        home: "Home",
        destination: "Destination",
        itinerary: "Itinerary",
        category: "Category",
        contact: "Contact",
        about: "About us",
        team: "Meet the team",
        descriptionFooter:
          "MoroccanWonders is an innovative platform that enables tourists to discover the hidden treasures of Morocco, evaluate their experiences, and plan personalized itineraries, all within a user-friendly and intuitive interface.",
        titleSignin: "Join us and live best moroccan experience",
        descriptionSignin:
          "Complete the sign-up form and embark on an unforgettable journey with us to experience the wonders of Morocco like never before!",
        firstName: "First name",
        lastName: "Last name",
        email: "Adresse email",
        phoneNumber: "Phone number",
        originCountry: "Origin country",
        password: "Password",
        confirmPassword: "Confirm password",
        agreedTerms: "I agree to the terms and",
        privacyPolicy: "Privacy policy",
        titleLogin: "Login to your account",
        descriptionLogin:
          "Login to save your trips and rate the places you've visited. Your data helps personalize your experience and provides tailored recommendations. Join us to enrich your exploration and assist fellow travelers.",
        error: "error",
        notFound: "Page not found",
        notFoundDesc: "Sorry, We couldn't find the page you're looking for.",
        backToHome: "Back to home page",
        confirmationEmail: "Email confirmation",
        confirm: "Confirm",
        titleConfirmEmail: "Confirm your email",
        descriptionConfirmation:
          "Welcome! To verify your identity and secure your account, please enter the One-Time Password (OTP) sent to your email or phone. Simply type the OTP into the field below and click 'Confirm'. If you encounter any issues, our support team is here to help.",
        otpConfirmationSuccess: "Your account has been activated",
        otpConfirmationFailure: "Your account has not been activated",
        submit: "Submit",
        forgetPassword: "Forget password ?",
        forgotPasswordDesc:
          "If you've forgotten your password, enter your email below. We'll send you a code to reset it.",
        resetPassword: "Reset password",
        resetPasswordTitle: "Reset your password",
        redirectSignup: "Don't have an account? ",
        rememberMe: "Remember me",
        confirmForgotPasswordDesc:
          "Please enter your new password and the code you received via email to reset your password.",
        confirmResetPassword: "Confirm reset password",
        confirmResetPasswordTitle: "Confirm your password Modification",
        validation: {
          required: "This field is required",
          invalidEmail: "Invalid email format",
          passwordRequirements:
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character",
          passwordMismatch: "Passwords do not match",
        },
        success: "Success",
        signupSuccess:
          "Sign up successful! Please check your email for confirmation.",
        signupFailed: "Signup failed. Please try again.",
      },
    },
    fr: {
      translation: {
        login: "Connexion",
        loginFailed : "Connexion échouée. Réessayez plus tard.",
        signin: "Inscription",
        hero1: "Trouvez votre",
        hero2: "prochain tour",
        hero3: "Où aimerais-tu aller ?",
        findNow: "Rechercher",
        home: "Accueil",
        destination: "Destination",
        itinerary: "Itinéraire",
        category: "Catéorie",
        contact: "Contact",
        about: "À propos de nous",
        team: "Notre équipe",
        descriptionFooter:
          "MoroccanWonders est une plateforme innovante qui permet aux touristes de découvrir les trésors cachés du Maroc, d'évaluer leurs expériences et de planifier des itinéraires personnalisés, le tout dans une interface conviviale et intuitive.",
        titleSignin: "Vivez la meilleure expérience marocaine",
        descriptionSignin:
          "Remplissez le formulaire d'inscription et embarquez avec nous pour un voyage inoubliable à la découverte des merveilles du Maroc comme jamais auparavant !",
        firstName: "Prénom",
        lastName: "Nom de famille",
        email: "Adresse email",
        phoneNumber: "Numéro de télephone",
        originCountry: "Pays d'origine",
        password: "Mot de passe",
        confirmPassword: "Confirmation mot de passe",
        agreedTerms: "J'accepte les conditions et la",
        privacyPolicy: "Politique de confidentialité",
        titleLogin: "Connectez-vous à votre compte",
        descriptionLogin:
          "Connectez-vous pour sauvegarder vos trajets et évaluer les lieux visités. Vos données contribuent à personnaliser votre expérience et à fournir des recommandations adaptées à vos goûts. Rejoignez-nous pour enrichir votre exploration et aider les autres voyageurs.",
        error: "erreur",
        notFound: "Page introuvable",
        notFoundDesc:
          "Désolé, nous n'avons pas pu trouver la page que vous recherchez.",
        backToHome: "Revenir à la page d'acceuil",
        confirmationEmail: "Confirmation de l'email",
        confirm: "Confirmer",
        titleConfirmEmail: "Confirmer votre email",
        descriptionConfirmation:
          "Bienvenue ! Pour vérifier votre identité et sécuriser votre compte, veuillez entrer le mot de passe à usage unique (OTP) envoyé à votre email ou téléphone. Tapez simplement l’OTP dans le champ ci-dessous et cliquez sur 'Confirmer'. Si vous rencontrez des problèmes, notre équipe de support est là pour vous aider.",
        otpConfirmationSuccess: "Votre compte a été activé",
        otpConfirmationFailure: "Votre compte n'a pas été activé",
        submit: "Envoyer",
        forgetPassword: "Mot de passe oublié ?",
        forgotPasswordDesc:
          "Si vous avez oublié votre mot de passe, saisissez votre adresse e-mail ci-dessous. Nous vous enverrons un code pour le réinitialiser.",
        resetPassword: "Réinitialiser le mot de passe",
        resetPasswordTitle: "Réinitialisez votre mot de passe",
        redirectSignup: "Vous n'avez pas de compte? ",
        rememberMe: "Se souvenir de moi",
        confirmForgotPasswordDesc:
          "Veuillez entrer votre nouveau mot de passe ainsi que le code reçu par email pour réinitialiser votre mot de passe.",
        confirmResetPassword: "Confirmer la réinitialisation du mot de passe",
        confirmResetPasswordTitle:
          "Confirmer la réinitialisation de votre mot de passe",
        validation: {
          required: "Ce champ est requis",
          invalidEmail: "Format d'email invalide",
          passwordRequirements:
            "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre, un chiffre et un caractère spécial",
          passwordMismatch: "Les mots de passe ne correspondent pas",
        },
        success: "Succès",
        signupSuccess:
          "Inscription réussie! Veuillez vérifier votre email pour la confirmation.",
        signupFailed: "L'inscription a échoué. Veuillez réessayer.",
      },
    },
  },

  lng: "en",
});
