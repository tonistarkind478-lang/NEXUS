const { useState, useEffect } = React;
const { motion, AnimatePresence, useScroll, useMotionValueEvent } = window.Motion;

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

// --- НОВЫЙ КОМПОНЕНТ: Кнопка "Наверх" ---
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 400);
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => (
    <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-darkbg/80 glass-panel border-b border-white/5"
    >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer z-50" onClick={(e) => {e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg rotate-45"></div>
                NEXUS<span className="text-blue-500">.</span>
            </a>
            <div className="hidden lg:flex space-x-8 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition">О платформе</button>
                <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition">Решения</button>
                <button onClick={() => scrollToSection('process')} className="hover:text-blue-400 transition">Процесс</button>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-blue-400 transition">Тарифы</button>
                <button onClick={() => scrollToSection('faq')} className="hover:text-blue-400 transition">FAQ</button>
            </div>
            <button 
                onClick={() => alert("Переход в личный кабинет...")}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-lg font-bold text-sm transition shadow-lg shadow-blue-600/20"
            >
                Личный кабинет
            </button>
        </div>
    </motion.nav>
);

// --- HERO SECTION ---
const Hero = () => {
    // Состояние для симуляции живых данных
    const [cpuLoad, setCpuLoad] = useState(14);
    const [memoryLoad, setMemoryLoad] = useState(6.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuLoad(Math.floor(Math.random() * (35 - 10 + 1) + 10)); // Случайное число от 10 до 35
            setMemoryLoad((Math.random() * (12 - 4 + 1) + 4).toFixed(1)); // Случайное число от 4.0 до 12.0
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
            <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Добавлен z-20, чтобы текст был поверх правого блока */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> Версия платформы 2.0 Enterprise
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                        Масштабируемая IT-инфраструктура для <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">глобального бизнеса.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                        Мы создаем высоконагруженные системы, внедряем AI-аналитику и обеспечиваем банковский уровень безопасности данных. Полный цикл разработки.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button 
                            onClick={() => scrollToSection('contact-form')}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition transform hover:scale-105"
                        >
                            Запросить консультацию
                        </button>
                        <button 
                            onClick={() => scrollToSection('services')}
                            className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white hover:border-white active:scale-95 rounded-xl font-bold text-lg transition"
                        >
                            Смотреть кейсы
                        </button>
                    </div>
                    <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-semibold uppercase tracking-widest">
                        <span>Trusted by:</span>
                        <div className="flex gap-6 opacity-50 grayscale">
                            <span>Google</span><span>Microsoft</span><span>Amazon</span>
                        </div>
                    </div>
                </motion.div>
                
                {/* Правый блок с "живым интерфейсом" */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block z-10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl -z-10"></div>
                    <div className="bg-cardbg border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                            <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                            <div className="text-sm text-gray-500 font-mono">system_monitor.jsx</div>
                        </div>
                            <div className="space-y-6 font-mono text-sm">
                            <div className="flex justify-between"><span className="text-blue-400">CPU Usage:</span> <span className="text-green-400 transition-all">{cpuLoad}% [Stable]</span></div>
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${cpuLoad}%` }}></div>
                            </div>
                            <div className="flex justify-between"><span className="text-purple-400">Memory:</span> <span className="text-green-400 transition-all">{memoryLoad}GB / 32GB</span></div>
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${(memoryLoad / 32) * 100}%` }}></div>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mt-8">
                                <div className="text-white font-bold flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                    </span>
                                    AI Prediction Model
                                </div>
                                <div className="text-blue-300 text-xs mt-2">Processing real-time data stream...</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => (
    <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">О компании NEXUS</h2>
                    <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Мы не просто пишем код. <br/>Мы строим цифровые экосистемы.</h3>
                    <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                        С 2018 года наша команда специализируется на решении сложных технологических задач для Enterprise-сектора. Мы отказываемся от шаблонных решений в пользу кастомной архитектуры.
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-8">
                    {[
                        { num: "5+", label: "Лет на рынке Enterprise" },
                        { num: "140+", label: "Успешных проектов" },
                        { num: "$50M+", label: "Сэкономлено клиентам" },
                        { num: "99%", label: "Uptime наших систем" }
                    ].map((item, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-cardbg border border-white/5 p-8 rounded-2xl text-center hover:border-blue-500/50 transition duration-300">
                            <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">{item.num}</div>
                            <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const Services = () => {
    const services = [
        { title: "Высоконагруженные SPA", desc: "Разработка сложных веб-приложений на React/Next.js, способных выдерживать миллионы запросов.", icon: "🚀" },
        { title: "Разработка SaaS Платформ", desc: "Создание облачных сервисов по подписке с нуля: биллинг, мульти-тенантость и API для интеграций.", icon: "☁️" },
        { title: "AI и Машинное Обучение", desc: "Внедрение нейросетей для анализа данных, предиктивной аналитики и автоматизации бизнес-процессов.", icon: "🤖" },
        { title: "Финтех и Блокчейн", desc: "Разработка защищенных финансовых инструментов, платежных шлюзов и смарт-контрактов.", icon: "💎" },
        { title: "DevOps Инфраструктура", desc: "Настройка CI/CD пайплайнов, Docker/Kubernetes, миграция в облако и обеспечение 24/7.", icon: "⚙️" },
        { title: "Mobile App Development", desc: "Кроссплатформенная разработка на React Native для iOS и Android с единой кодовой базой.", icon: "📱" }
    ];
    return (
        <section id="services" className="py-32 bg-darkbg/50 relative border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Наши компетенции</h2>
                    <h3 className="text-4xl md:text-5xl font-black mb-8">Технологические решения<br/>любого масштаба</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }} 
                            className="group bg-cardbg border border-white/5 p-8 md:p-10 rounded-3xl hover:bg-blue-900/10 hover:border-blue-500/30 transition duration-500 cursor-pointer relative overflow-hidden flex flex-col h-full justify-between"
                        >
                            <div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition"></div>
                                <div className="text-5xl mb-6 relative z-10">{s.icon}</div>
                                <h4 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-blue-400 transition">{s.title}</h4>
                                <p className="text-gray-400 leading-relaxed relative z-10 mb-6 break-words">{s.desc}</p>
                            </div>
                            <div className="flex items-center text-blue-500 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Подробнее <span className="ml-2">→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Process = () => {
    const steps = [
        { num: "01", title: "Дискавери и Аналитика", desc: "Глубокое погружение в бизнес-процессы. Сбор требований, анализ конкурентов, формирование ТЗ и дорожной карты." },
        { num: "02", title: "Проектирование и UX/UI", desc: "Создание информационной архитектуры, прототипирование интерфейсов. Разработка дизайн-системы." },
        { num: "03", title: "Агил-Разработка", desc: "Разработка по методологии Scrum короткими итерациями (спринтами). Регулярные демо-показы." },
        { num: "04", title: "QA и Тестирование", desc: "Многоуровневое тестирование: автоматические unit-тесты, интеграционное, ручное тестирование интерфейса." },
        { num: "05", title: "Деплой и Поддержка", desc: "Настройка продакшн-серверов, релиз проекта. Мониторинг работы системы 24/7 и развитие." }
    ];
    return (
        <section id="process" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Как мы работаем</h2>
                    <h3 className="text-4xl md:text-5xl font-black">Прозрачный процесс<br/>разработки продукта</h3>
                </div>
                <div className="relative">
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-blue-500/30 h-full transform md:-translate-x-1/2 hidden md:block"></div>
                    <div className="space-y-16">
                        {steps.map((step, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-1/2 p-4 w-full">
                                        <div className={`bg-cardbg border border-white/5 p-8 rounded-2xl shadow-xl relative hover:border-blue-500/30 transition ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                                            <div className="text-6xl font-black text-blue-500/10 absolute top-4 right-4 z-0">{step.num}</div>
                                            <h4 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h4>
                                            <p className="text-gray-400 leading-relaxed relative z-10 break-words">{step.desc}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-darkbg z-20 shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold hidden md:flex">{step.num}</div>
                                    <div className="md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Pricing = () => {
        const plans = [
        { name: "Стартап", price: "$5,000", sub: "За MVP проект", desc: "Идеально для проверки гипотезы и быстрого запуска первой версии продукта.", features: ["Аналитика и ТЗ (Lite)", "Уникальный UX/UI Дизайн", "React Front-end (SPA)", "Базовый Back-end (API)", "Настройка хостинга", "1 месяц поддержки"], popular: false },
        { name: "Бизнес", price: "$15,000", sub: "За проект", desc: "Полноценное решение для действующего бизнеса с интеграциями и сложной логикой.", features: ["Глубокая аналитика", "Дизайн-система", "Сложный React/Redux", "Масштабируемый Back-end", "Интеграции (CRM, Pay)", "SEO-оптимизация", "Тестирование и QA", "3 месяца поддержки"], popular: true },
        { name: "Корпорация", price: "Индивидуально", sub: "Долгосрочное партнерство", desc: "Выделенная команда разработчиков под ваши задачи с полным погружением.", features: ["Выделенная Agile команда", "Архитектура Highload", "Внедрение AI/ML", "Аудит безопасности", "DevOps и CI/CD", "SLA 99.9% и NDA", "Поддержка 24/7", "Консалтинг CTO"], popular: false }
    ];
    return (
        <section id="pricing" className="py-32 bg-darkbg/50 border-y border-white/5 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Инвестиции</h2>
                    <h3 className="text-4xl md:text-5xl font-black mb-8">Прозрачные модели<br/>сотрудничества</h3>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className={`bg-cardbg p-8 md:p-10 rounded-3xl border ${plan.popular ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.2)] scale-105 z-10 relative' : 'border-white/5'} flex flex-col h-full justify-between`}>
                                <div>
                                    {plan.popular && <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-bl-xl rounded-tr-3xl">Популярный</div>}
                                    <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-2xl md:text-4xl font-black break-words hyphens-auto">{plan.price}</span>
                                    </div>
                                    <p className="text-sm text-blue-400 font-medium mb-6">{plan.sub}</p>
                                    <p className="text-gray-400 mb-8 leading-relaxed break-words">{plan.desc}</p>
                                    <ul className="space-y-4 mb-10">
                                        {plan.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                <span className="text-gray-300 font-medium text-sm break-words">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button 
                                    onClick={() => scrollToSection('contact-form')}
                                    className={`w-full py-5 rounded-xl font-bold text-lg transition active:scale-95 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                                >
                                        Обсудить проект
                                </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
        { q: "С какими нишами вы работаете?", a: "Мы специализируемся на сложных проектах в сферах FinTech, EdTech, E-commerce, Logistics и Healthcare." },
        { q: "Какой стек технологий вы используете?", a: "Front-end — React.js, Next.js. Back-end — Node.js, Python, Go. Инфраструктура — AWS, Google Cloud, Docker." },
        { q: "Как происходит оценка стоимости?", a: "Мы проводим этап 'Дискавери', анализируем требования и составляем ТЗ. На основе этого даем точную оценку." },
        { q: "Есть ли поддержка после запуска?", a: "Да, мы мониторим систему 24/7, исправляем баги и помогаем с масштабированием по SLA." },
    ];
    return (
        <section id="faq" className="py-32 relative">
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">FAQ</h2>
                    <h3 className="text-4xl md:text-5xl font-black">Часто задаваемые<br/>вопросы</h3>
                </div>
                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-cardbg border border-white/5 rounded-2xl overflow-hidden transition hover:border-blue-500/30">
                            <button onClick={() => setActiveIndex(activeIndex === idx ? null : idx)} className="w-full text-left p-8 flex justify-between items-center cursor-pointer">
                                <h4 className="text-xl font-bold pr-8">{faq.q}</h4>
                                <motion.div animate={{ rotate: activeIndex === idx ? 180 : 0 }} className="text-blue-500 shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <p className="p-8 pt-0 text-gray-400 leading-relaxed border-t border-white/5">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Отправка...";
        setTimeout(() => {
            alert("✅ Заявка успешно отправлена! Наш менеджер свяжется с вами в Telegram.");
            btn.innerText = "Отправлено";
            e.target.reset();
            setTimeout(() => btn.innerText = originalText, 3000);
        }, 1000);
    };

    return (
        <footer className="pt-32 bg-[#050810] relative border-t border-white/5">
            <div id="contact-form" className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-blue-900 to-indigo-900 p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-blue-900/30">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Готовы оцифровать <br/>свой бизнес?</h2>
                    <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
                        Оставьте заявку на бесплатную стратегическую сессию.
                    </p>
                    <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
                        <input required type="email" placeholder="Ваш Email" className="px-8 py-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:bg-white/20 focus:border-blue-400 transition min-w-[320px] text-lg" />
                        <button type="submit" className="px-10 py-5 bg-white text-blue-900 font-black rounded-xl hover:bg-blue-50 active:scale-95 transition transform hover:scale-105 text-lg shadow-xl">
                            Отправить заявку
                        </button>
                    </form>
                    <p className="text-blue-300/60 text-sm mt-6 relative z-10">Нажимая кнопку, вы соглашаетесь с политикой обработки данных.</p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b border-white/5 text-sm relative z-10">
                <div className="col-span-2">
                        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-blue-600 rounded-md rotate-45"></div>
                        NEXUS<span className="text-blue-500">.</span>
                    </div>
                    <p className="text-gray-400 pr-12 leading-relaxed">Разработка высокотехнологичных IT-решений для бизнеса по всему миру.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-widest mb-6">Компания</h4>
                    <ul className="space-y-4 text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-blue-400 transition">О нас</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Карьера</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Блог</a></li>
                    </ul>
                </div>
                    <div>
                    <h4 className="font-bold text-white uppercase tracking-widest mb-6">Услуги</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-blue-400 transition">Web Разработка</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Mobile App</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">UI/UX Дизайн</a></li>
                    </ul>
                </div>
                    <div>
                    <h4 className="font-bold text-white uppercase tracking-widest mb-6">Контакты</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-blue-400 transition">Telegram</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">WhatsApp</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Email</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                <p>&copy; 2023-2025 NEXUS GLOBAL INC. All rights reserved.</p>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white selection:bg-blue-500/30 selection:text-blue-100 relative">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Process />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
            {/* Добавлена кнопка "Наверх" */}
            <BackToTop />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
