<script>
    // Função para navegar entre as seções
    function showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
        const target = document.getElementById(sectionId);
        if(target) target.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // LÓGICA DA CALCULADORA
    const inputKm = document.getElementById('input-km');
    const inputEnergy = document.getElementById('input-energy');
    
    const displayKm = document.getElementById('val-km');
    const displayEnergy = document.getElementById('val-energy');
    const displayCo2 = document.getElementById('res-co2');
    const progressBar = document.getElementById('bar-progresso');
    const statusAr = document.getElementById('status-ar');

    function calcular() {
        const km = parseFloat(inputKm.value);
        const energy = parseFloat(inputEnergy.value);

        // Atualiza textos dos sliders
        displayKm.innerText = km + " km";
        displayEnergy.innerText = energy + " kWh";

        // Cálculo Simples de CO2 (Valores médios aproximados)
        // 0.12kg por km rodado + 0.5kg por kWh gasto
        const totalCo2 = (km * 4 * 0.12) + (energy * 0.47);
        displayCo2.innerText = totalCo2.toFixed(1);

        // Atualiza o medidor visual de "Qualidade do Ar"
        // Quanto mais CO2, menor a "barra de pureza"
        let pureza = 100 - (totalCo2 / 10); 
        if(pureza < 10) pureza = 10; // Mínimo de 10%

        progressBar.style.width = pureza + "%";

        // Altera cores e status conforme o impacto
        if(pureza > 80) {
            statusAr.innerText = "Excelente";
            statusAr.className = "text-primary";
            progressBar.className = "h-full bg-primary transition-all";
        } else if(pureza > 50) {
            statusAr.innerText = "Moderado";
            statusAr.className = "text-yellow-500";
            progressBar.className = "h-full bg-yellow-500 transition-all";
        } else {
            statusAr.innerText = "Crítico";
            statusAr.className = "text-red-500";
            progressBar.className = "h-full bg-red-500 transition-all";
        }
    }

    // Adiciona os eventos para calcular enquanto arrasta o mouse
    inputKm.addEventListener('input', calcular);
    inputEnergy.addEventListener('input', calcular);

    // Inicia na home e roda o primeiro cálculo
    window.onload = () => {
        showSection('home');
        calcular();
    };
</script>