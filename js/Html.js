export class Html
{
    constructor()
    {

    }
    init()
    {
        let listMenu=['Game','Rules','Ranking'];
        this.showHeader(document.body,listMenu);
        let alertmessage=this.showDiv('alertmessage',document.body);
        alertmessage.style.height='60px';
        alertmessage.style.display='none';
        let divPrincipal=this.showDiv('divprincipal',document.body);
        divPrincipal.style.display='flex';
        divPrincipal.style.justifyContent='space-evenly';
        divPrincipal.style.alignItems='center';
        let btnStart=this.showButton('btnstart',divPrincipal);
        let divrules=this.showDiv('divrules',document.body);
        divrules.style.backgroundColor='#b5b5b5';
        divrules.style.display='none';

        let divranking=this.showDiv('divranking',document.body);
        divranking.style.backgroundColor='#c6c6c6';
        divranking.style.display='none';

        let divrecscore=this.showDiv('divrecordscore',divPrincipal);
        divrecscore.style.backgroundColor='#ff0000';
        divrecscore.style.display='none';

        this.showFooter(document.body);
    }
    showDiv(id,parent)
    {
        let obj=document.createElement('div');
        obj.id=id;
        parent.append(obj);
        return obj;
    }
    showHeader(parent, listMenu)
    {
        let obj=document.createElement('header');
        obj.classList="m-b-20";
        let objA=document.createElement('a');
        objA.id='imglogo';
        objA.href='#';
        let imgLogo=document.createElement('img');
        imgLogo.src='pictures/logo150x80.jpg';
        imgLogo.alt='logo';
        objA.append(imgLogo);
        obj.append(objA);
        let title=document.createElement('h1');
        title.textContent='BrickBraker : le casse-brique made in 80\'s';
        title.style.display='inline-block';
        title.style.marginLeft='20px';
        title.style.verticalAlign='middle';
        title.style.font='Impact';
        obj.append(title);
        this.showMenu('menu',obj,listMenu);
        parent.append(obj);
    }
    showMenu(id,parent,listMenu)
    {
        let obj= document.createElement('nav');
        obj.id=id;
        obj.append(this.createUl(listMenu));
        parent.append(obj);   
    }
    createUl(items)
    {
        let objUl=document.createElement('ul');
        for(let item of items)
            {
                objUl.append(this.createLi(item));    
            }
        return objUl;
    }
    createLi(item)
    {
        let objLi=document.createElement('li');
        objLi.append(this.createA(item));
        return objLi;
    }
    createA(item)//eventBool=> ajouter evenement
    {
        let objA=document.createElement('a');
        objA.href="?action="+item;
        objA.textContent=item;
        return objA;
    }

    createTd(parent,text,align_h,color,colorBck, className = '')
    {
        let td = document.createElement('td');
        td.textContent = text;
        td.className = className;
        td.style.backgroundColor = colorBck || '#fff'; // Défaut à blanc si non spécifié
        td.style.color = color || '#000'; // Défaut à noir si non spécifié
        td.style.textAlign = align_h || 'left'; // Défaut à 'left' si non spécifié
        td.style.padding = '6px';
        td.style.border = '1px solid #ccc';
        parent.append(td);
        return td;
    }
    createTh(parent, text, align_h = 'center', color = '#fff', background = '#78a5ab', scope = 'col') 
    {
        const th = document.createElement('th');
        th.textContent = text;
        th.scope = scope;
        th.style.textAlign = align_h;
        th.style.color = color;
        th.style.background = background;
        th.style.border = "1px solid #ccc";
        th.style.padding = "6px";
        parent.append(th);
        return th;
    }
    showButton(id,parent)
    {
        let obj=document.createElement('input');
        obj.id=id;
        obj.type='button';
        obj.value='START';
        parent.append(obj);
        return obj;
    }
    showFooter(parent)
    {
        let obj=document.createElement('footer');
        parent.append(obj);
    }
    showSections(principal = 'none', rules = 'none', ranking = 'none' ) 
    {
        const divPrincipal = document.getElementById('divprincipal');
        const divRules = document.getElementById('divrules');
        const divRanking = document.getElementById('divranking');
        if (divPrincipal) divPrincipal.style.display = principal;// si existe alors on le modifie
        if (divRules) divRules.style.display = rules;
        if (divRanking) divRanking.style.display = ranking;
    }

    showScoreTable(data) {
        const container = document.getElementById('divranking');
        if (!container) return;
        container.innerHTML = '';
        const table = this.createTabScore(data);
        container.append(table);
        container.style.height = 'auto';
    }
    createTabScore(data)
    {
        let table = document.createElement('table');
        table.id = "dataTable";
        table.style.width = "60%";
        table.style.margin = "30px auto";
        table.style.borderCollapse = "collapse";
        table.style.background = "#f9f9f9";
        table.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

        let thead = document.createElement('thead');
        table.append(thead);
        let tr = document.createElement('tr');
        thead.append(tr);

        const headers = ["Ranking", "Pseudo", "Score", "Date"];
        headers.forEach(text => {
            this.createTh(tr, text);
        });

        let tbody = document.createElement('tbody');
        table.append(tbody);
        let i = 1;
        data.forEach(item =>
        {
            tr = document.createElement('tr');
            // Alternance de couleur
            if(i % 2 === 0)
            {
                tr.style.background = "#e1ebec";
            }
            else
            {
                tr.style.background = "#fff";
            }
            this.createTd(tr, i + '.', 'center', '#000', tr.style.background);
            this.createTd(tr, item.pseudo, 'left', '#000', tr.style.background);
            this.createTd(tr, item.score, 'center', '#000', tr.style.background);
            this.createTd(tr, item.date, 'center', '#000', tr.style.background);
            tbody.append(tr);
            i++;
        });
        return table;
    }
    
    showPseudoModal(callback) 
    {
        if (document.getElementById('modalPseudo')) return; // Si la modale existe déjà, on ne la recrée pas
        // Création du fond de la modale
        const modal = document.createElement('div');
        modal.id = 'modalPseudo';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        // Création du contenu de la modale
        const box = document.createElement('div');
        box.style.background = '#fff';
        box.style.padding = '20px';
        box.style.borderRadius = '8px';
        box.style.minWidth = '250px';
        box.style.textAlign = 'center';

        // Création du formulaire
        const form = document.createElement('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validate();
        });

        const title = document.createElement('h2');
        title.textContent = 'Entrez votre pseudo';
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'inputPseudo';
        input.placeholder = 'Votre pseudo';
        input.style.width = '90%';
        input.style.marginBottom = '10px';
        input.required = true;
        const br = document.createElement('br');
        const btn = document.createElement('button');
        btn.id = 'btnValiderPseudo';
        btn.type = 'submit';
        btn.textContent = 'Valider';

        // Ajout des éléments au formulaire
        form.append(title);
        form.append(input);
        form.append(br);
        form.append(btn);

        // Ajout du formulaire à la box
        box.append(form);
        modal.append(box);
        document.body.append(modal);

        input.focus();// place le curseur dans le champ de saisie

        function validate() 
        {
            const pseudo = input.value.trim();// on supprime les espaces avant et apres
            if (pseudo) 
            {
                document.body.removeChild(modal);
                callback(pseudo);//va executer la fonction resolve de la promesse
            }
        }
    }

    async askPseudo(objScore)//on attend la saisie de l'utilisateur =>promise async await
    {
        while (true) //tourne indefiniment jusqu'a la saisie d'un pseudo valide
        {
            const pseudo = await new Promise(resolve => this.showPseudoModal(resolve));
            //resolve fait partie de promise,indique que la promesse est terminée et renvoie le pseudo saisi
            const result = objScore.setUser(pseudo);
            this.showAlert(result.message, result.valid ? 'success' : 'danger');
            if (result.valid) 
            {
                setTimeout(() => {
                    window.location.href = "index.html?action=Ranking";
                }, 2100);
                return pseudo;
            }
            await new Promise(res => setTimeout(res, 1500));
        }
    }

    showAlert(message, type = 'success') 
    {
        const container = document.getElementById('alertmessage');
        if (!container) return;
        container.innerHTML = '';
        container.classList.remove('alert-success', 'alert-danger');
        container.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
        let h = document.createElement('h2');
        h.textContent = message;
        container.append(h);
        container.style.display = 'block';
        setTimeout(() => { container.style.display = 'none'; }, 2000);
    }

    showRules(rulesObj) 
    {
        const container = document.getElementById('divrules');
        if (!container) return;
        container.innerHTML = "";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";

        // Titre
        const title = document.createElement('h2');
        title.textContent = rulesObj.title;
        container.appendChild(title);

        // Liste des règles
        const ul = document.createElement('ul');
        if (rulesObj.items && Array.isArray(rulesObj.items)) 
        {
            rulesObj.items.forEach(rule => { 
            const li = document.createElement('li');
            li.textContent = rule;
            ul.appendChild(li);
            });
        } 
        else 
        {
            const li = document.createElement('li');
            li.textContent = "Aucune règle définie.";
            ul.appendChild(li);
        }        
        container.appendChild(ul);
        const br=document.createElement('br');
        container.appendChild(br);
        // Tableau des briques
        if (rulesObj.bricks && rulesObj.bricks.length > 0) 
        {
            const brickTitle = document.createElement('h3');
            brickTitle.textContent = "Classification des briques";
            container.appendChild(brickTitle);

            const table = document.createElement('table');
            table.style.marginTop = "10px";
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";

            // En-tête
            const thead = document.createElement('thead');
            const trHead = document.createElement('tr');
            const headers =["Type", "Couleur", "Points", "Description"];
            headers.forEach(text => {
                const th = this.createTh(trHead, text);
            });
            thead.appendChild(trHead);
            table.appendChild(thead);

            // Corps du tableau
            const tbody = document.createElement('tbody');
            rulesObj.bricks.forEach(brick => 
            {
                const tr = document.createElement('tr');
                tr.style.backgroundColor = "#f9f9f9"; // Couleur de fond des lignes
                const tdType=this.createTd(tr, brick.type, 'left', '#000', '#f9f9f9');
                // Couleur (cellule colorée)
                const tdColor=this.createTd(tr, "", 'left', '#000', brick.color);
                // Points
                const tdPoints=this.createTd(tr, brick.points, 'left', '#000', '#f9f9f9');
                // Description
                const tdDesc = this.createTd(tr, brick.description, 'left', '#000', '#f9f9f9');

                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            container.appendChild(table);
        }
    }

}