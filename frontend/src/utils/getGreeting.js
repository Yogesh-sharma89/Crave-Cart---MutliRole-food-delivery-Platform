const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 4 && hour < 12) {
        return {
            title: "Good morning",
            emoji: "☀️",
            subtitle: "Start your day with something delicious.",
        };
    }

    if (hour >= 12 && hour < 17) {
        return {
            title: "Good afternoon",
            emoji: "🌤️",
            subtitle: "A tasty meal is always a good idea.",
        };
    }

    return {
        title: "Good evening",
        emoji: "🌙",
        subtitle: "Relax, choose your favorite food, and let us handle the rest.",
    };
};

export default getGreeting;