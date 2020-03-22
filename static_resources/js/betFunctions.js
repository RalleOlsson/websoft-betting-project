function placeBet(i, balance, betJson) {
    const bets = JSON.parse(betJson);
    balance = parseInt(balance);
    var teamName = document.getElementsByClassName("selectTeam");
    var stake = document.getElementsByClassName("bet");

    var team = teamName[i].value;
    var value = parseInt(stake[i].value);
    console.log("value" + value);
    console.log("total" + (balance + bets[i].stake));
    if (value > balance + bets[i].stake) {
        alert("not enough dough");
    } else if (value <= balance + bets[i].stake) {

        fetch('http://localhost:1337/api/bets/' + bets[i].betId, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                betId: bets[i].betId,
                user_userId: bets[i].user_userId,
                match_matchId: bets[i].match_matchId,
                stake: value,
                status: 'active',
                game: bets[i].game,
                betPlaced: team
            })

        }).then(() => {
            withdraw = 0 - (value - bets[i].stake);
            fetch('http://localhost:1337/api/user/' + bets[i].user_userId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    payment: withdraw
                })
            }).then(() => {
                alert("money withdraw, Page is now refreshing");
                location.reload();
            });
            alert("bet changed");
        });
    }
}

function deleteBet(i, betJson) {
    const bets = JSON.parse(betJson);
    fetch('http://localhost:1337/api/bets/' + bets[i].betId, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            betId: bets[i].betId,
            stake: bets[i].stake,
            user_userId: bets[i].user_userId
        })
    }).then(() => {
        alert("deleted bet");
        location.reload(true);
    })
}

function addFunds(money, userId) {

    fetch('http://localhost:1337/api/user/' + userId, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            payment: money
        })
    }).then(() => {
        alert("money added, Page is now refreshing");
        location.reload();
    });
}