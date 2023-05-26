        var original = document.getElementById("cards");

        var clone = original.cloneNode(true);
        clone.id = "";
        original.parentNode.appendChild(clone);