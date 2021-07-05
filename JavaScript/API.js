const catbtn = document.getElementById('catbtn');
const catPic = document.getElementById('CatPics');

catbtn.addEventListener('click', getCat);

function getCat() {

	fetch('https://aws.random.cat/meow')

		.then(res => res.json())

		.then(data => {

			catPic.innerHTML = `<img src=${data.file} alt="cat">`

		});
}




		
