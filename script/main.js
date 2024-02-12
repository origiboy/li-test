function init() {
    const jsonData = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100.0,
                "sorthead": 20
            },
            {
                "id": 2,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 3,
                "head": 2,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 4,
                "head": 3,
                "name": "Удаление зуба",
                "node": 0,
                "price": 800.0,
                "sorthead": 10
            },
            {
                "id": 5,
                "head": 3,
                "name": "Удаление 8ого зуба",
                "node": 0,
                "price": 1000.0,
                "sorthead": 30
            },
            {
                "id": 6,
                "head": 3,
                "name": "Удаление осколка зуба",
                "node": 0,
                "price": 2000.0,
                "sorthead": 20
            },
            {
                "id": 7,
                "head": 2,
                "name": "Хирургические вмешательство",
                "node": 0,
                "price": 200.0,
                "sorthead": 10
            },
            {
                "id": 8,
                "head": 2,
                "name": "Имплантация зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 20
            },
            {
                "id": 9,
                "head": 8,
                "name": "Коронка",
                "node": 0,
                "price": 3000.0,
                "sorthead": 10
            },
            {
                "id": 10,
                "head": 8,
                "name": "Слепок челюсти",
                "node": 0,
                "price": 500.0,
                "sorthead": 20
            }
        ]
    }
    const sortedData = jsonData.services.slice().sort((a, b) => a.sorthead - b.sorthead);
    document.addEventListener("DOMContentLoaded", function () {
        const container = document.getElementById("app");
        container.appendChild(createTree(sortedData, null));
    
        function createTree(nodes, parentId) {
            const ulElement = document.createElement("ul");
    
            nodes
                .filter(node => node.head === parentId)
                .forEach(nodeData => {
                    const liElement = document.createElement("li");
                    const header = document.createElement("h3");
                    header.classList.add('display-center');
                    header.classList.add('text');
                    if (hasChildren(nodes, nodeData.id)) {
                        const dropdownIcon = document.createElement("img");
                        dropdownIcon.src = './images/arrow.svg'
                        dropdownIcon.classList.add("dropdown-icon");
                        header.addEventListener("click", function () {
                            liElement.querySelector(".child").classList.toggle("open");
                            dropdownIcon.classList.toggle("open");
                        });
                        header.appendChild(dropdownIcon);
                    }
    
                    const nodeElement = document.createElement("span");
                    nodeElement.classList.add("node");
    
                    if (!hasChildren(nodes, nodeData.id)) {
                        nodeElement.classList.add("node-without-arrow");
                    }
    
                    if (nodeData.price)
                        nodeElement.innerHTML = `${nodeData.name} (${nodeData.price})`;
                    else
                        nodeElement.innerHTML = `${nodeData.name}`;
                    header.appendChild(nodeElement);
                    liElement.appendChild(header);
    
                    const childNodes = createTree(nodes, nodeData.id);
                    if (childNodes.children.length > 0) {
                        const childUl = document.createElement("ul");
                        childUl.classList.add("child");
                        childUl.appendChild(childNodes);
                        liElement.appendChild(childUl);
                    }
    
                    ulElement.appendChild(liElement);
                });
    
            return ulElement;
        }
    
        function hasChildren(nodes, parentId) {
            return nodes.some(node => node.head === parentId);
        }
    
        container.addEventListener("click", function (event) {
            const target = event.target;
    
            if (target.classList.contains("node")) {
                const ulElement = target.nextElementSibling;
    
                if (ulElement) {
                    ulElement.style.display = ulElement.style.display === "none" ? "" : "none";
                }
            }
        });
    });
}

init()
