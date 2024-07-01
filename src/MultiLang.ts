import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        signin: "Sign in",
        hero1: "Find your",
        hero2: "next tour",
        hero3: "Where would you like to go ?",
        findNow: "Find now",
        home: "Home",
        destination: "Destination",
        itinerary: "Itinerary",
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
        agreedTerms: "I agree to the terms and",
        privacyPolicy: "Privacy policy",
        titleLogin: "Login to your account",
        descriptionLogin:
          "Login to save your trips and rate the places you've visited. Your data helps personalize your experience and provides tailored recommendations. Join us to enrich your exploration and assist fellow travelers.",
        error: "error",
        notFound: "Page not found",
        notFoundDesc: "Sorry, We couldn't find the page you're looking for.",
        backToHome: "Back to home page",
      },
    },
    fr: {
      translation: {
        login: "Connexion",
        signin: "Inscription",
        hero1: "Trouvez votre",
        hero2: "prochain tour",
        hero3: "Où aimerais-tu aller ?",
        findNow: "Rechercher",
        home: "Accueil",
        destination: "Destination",
        itinerary: "Itinéraire",
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
        agreedTerms: "J'accepte les conditions et la",
        privacyPolicy: "Politique de confidentialité",
        titleLogin: "Connectez-vous à votre compte",
        descriptionLogin:
          "Connectez-vous pour sauvegarder vos trajets et évaluer les lieux visités. Vos données contribuent à personnaliser votre expérience et à fournir des recommandations adaptées à vos goûts. Rejoignez-nous pour enrichir votre exploration et aider les autres voyageurs.",
          error: "erreur",
        notFound: "Page introuvable",
        notFoundDesc: "Désolé, nous n'avons pas pu trouver la page que vous recherchez.",
        backToHome: "Revenir à la page d'acceuil",
      },
    },
  },

  lng: "en",
});
