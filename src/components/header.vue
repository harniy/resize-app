<template>
    <div class="head_block">
        <header>
            <a href="">Resizer</a>
            <ul>
             <router-link :to="{name: 'resize'}"><li>Изменить</li></router-link>   
             <router-link :to="{ name: 'crope'}"><li>Обрезать</li></router-link>
            </ul>
        </header>
    </div>
</template>


<style>
header {
    width: 100%;
}
.head_block {
     display: flex;
}
.head_block a {
    text-decoration: none;
    padding: 0 40px;
    color: coral;
    font-weight: 900;
    font-size: 25px;
    float: left;
}
.head_block ul {
    padding: 7px 43px;
    font-size: 20px;
    font-weight: 600;
    width: 70%;
}
.head_block ul a {
    padding: 0;
    font-weight: 300;
}
.head_block ul li {
    color: #2c3e50;
    transition: .3s;
        padding: 0 20px;
    font-family: inherit;
    font-size: 20px;
}
.head_block ul li:hover {
    color: #ff7f50;
}
</style>