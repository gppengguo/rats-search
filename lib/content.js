const ContentTypes = {
	VIDEO: 'video',
	AUDIO: 'audio',
	PICTURES: 'pictures',
	BOOKS: 'books',
	APPLICATION: 'application'
}

const ExtesionBase = {
	webm: ContentTypes.VIDEO,
	mkv: ContentTypes.VIDEO,
	flv: ContentTypes.VIDEO,
	vob: ContentTypes.VIDEO,
	ogv: ContentTypes.VIDEO,
	drc: ContentTypes.VIDEO,
	mng: ContentTypes.VIDEO,
	avi: ContentTypes.VIDEO,
	mov: ContentTypes.VIDEO,
	qt: ContentTypes.VIDEO,
	wmv: ContentTypes.VIDEO,
	yuv: ContentTypes.VIDEO,
	rm: ContentTypes.VIDEO,
	rmvb: ContentTypes.VIDEO,
	asf: ContentTypes.VIDEO,
	amv: ContentTypes.VIDEO,
	mp4: ContentTypes.VIDEO,
	m4p: ContentTypes.VIDEO,
	m4v: ContentTypes.VIDEO,
	mpg: ContentTypes.VIDEO,
	mpeg: ContentTypes.VIDEO,
	mpv: ContentTypes.VIDEO,
	svi: ContentTypes.VIDEO,
	'3gp': ContentTypes.VIDEO,
	'3g2': ContentTypes.VIDEO,
	mxf: ContentTypes.VIDEO,
	roq: ContentTypes.VIDEO,
	nsv: ContentTypes.VIDEO,
	f4v: ContentTypes.VIDEO,

	aa: ContentTypes.AUDIO,
	aac: ContentTypes.AUDIO,
	aax: ContentTypes.AUDIO,
	act: ContentTypes.AUDIO,
	aiff: ContentTypes.AUDIO,
	amr: ContentTypes.AUDIO,
	ape: ContentTypes.AUDIO,
	au: ContentTypes.AUDIO,
	awb: ContentTypes.AUDIO,
	dct: ContentTypes.AUDIO,
	dss: ContentTypes.AUDIO,
	dvf: ContentTypes.AUDIO,
	flac: ContentTypes.AUDIO,
	gsm: ContentTypes.AUDIO,
	iklax: ContentTypes.AUDIO,
	ivs: ContentTypes.AUDIO,
	m4a: ContentTypes.AUDIO,
	mmf: ContentTypes.AUDIO,
	mp3: ContentTypes.AUDIO,
	mpc: ContentTypes.AUDIO,
	msv: ContentTypes.AUDIO,
	ogg: ContentTypes.AUDIO,
	oga: ContentTypes.AUDIO,
	opus: ContentTypes.AUDIO,
	rm: ContentTypes.AUDIO,
	ra: ContentTypes.AUDIO,
	raw: ContentTypes.AUDIO,
	sln: ContentTypes.AUDIO,
	tta: ContentTypes.AUDIO,
	vox: ContentTypes.AUDIO,
	wav: ContentTypes.AUDIO,
	wma: ContentTypes.AUDIO,
	wv: ContentTypes.AUDIO,

	jpg: ContentTypes.PICTURES,
	jpeg: ContentTypes.PICTURES,
	exif: ContentTypes.PICTURES,
	gif: ContentTypes.PICTURES,
	tiff: ContentTypes.PICTURES,
	bmp: ContentTypes.PICTURES,
	png: ContentTypes.PICTURES,
	ppm: ContentTypes.PICTURES,
	pgm: ContentTypes.PICTURES,
	pbm: ContentTypes.PICTURES,
	pnm: ContentTypes.PICTURES,
	webp: ContentTypes.PICTURES,
	heif: ContentTypes.PICTURES,
	bpg: ContentTypes.PICTURES,
	ico: ContentTypes.PICTURES,
	tga: ContentTypes.PICTURES,
	cd5: ContentTypes.PICTURES,
	deep: ContentTypes.PICTURES,
	ecw: ContentTypes.PICTURES,
	fits: ContentTypes.PICTURES,
	flif: ContentTypes.PICTURES,
	ilbm: ContentTypes.PICTURES,
	img: ContentTypes.PICTURES,
	nrrd: ContentTypes.PICTURES,
	pam: ContentTypes.PICTURES,
	pcx: ContentTypes.PICTURES,
	pgf: ContentTypes.PICTURES,
	sgi: ContentTypes.PICTURES,
	sid: ContentTypes.PICTURES,
	vicar: ContentTypes.PICTURES,
	psd: ContentTypes.PICTURES,
	cpt: ContentTypes.PICTURES,
	psp: ContentTypes.PICTURES,
	xcf: ContentTypes.PICTURES,
	svg: ContentTypes.PICTURES,
	cgm: ContentTypes.PICTURES,
	cdr: ContentTypes.PICTURES,
	hvif: ContentTypes.PICTURES,
	odg: ContentTypes.PICTURES,
	vml: ContentTypes.PICTURES,
	wmf: ContentTypes.PICTURES,

	cbr: ContentTypes.BOOKS,
	cbz: ContentTypes.BOOKS,
	cb7: ContentTypes.BOOKS,
	cbt: ContentTypes.BOOKS,
	cba: ContentTypes.BOOKS,
	lrf: ContentTypes.BOOKS,
	lrx: ContentTypes.BOOKS,
	chm: ContentTypes.BOOKS,
	djvu: ContentTypes.BOOKS,
	doc: ContentTypes.BOOKS,
	docx: ContentTypes.BOOKS,
	epub: ContentTypes.BOOKS,
	pdf: ContentTypes.BOOKS,
	pdb: ContentTypes.BOOKS,
	fb2: ContentTypes.BOOKS,
	xeb: ContentTypes.BOOKS,
	ceb: ContentTypes.BOOKS,
	htm: ContentTypes.BOOKS,
	html: ContentTypes.BOOKS,
	css: ContentTypes.BOOKS,
	txt: ContentTypes.BOOKS,
	ibooks: ContentTypes.BOOKS,
	inf: ContentTypes.BOOKS,
	azw3: ContentTypes.BOOKS,
	azw: ContentTypes.BOOKS,
	kf8: ContentTypes.BOOKS,
	lit: ContentTypes.BOOKS,
	prc: ContentTypes.BOOKS,
	mobi: ContentTypes.BOOKS,
	opf: ContentTypes.BOOKS,
	txt: ContentTypes.BOOKS,
	pdb: ContentTypes.BOOKS,
	rtf: ContentTypes.BOOKS,
	pdg: ContentTypes.BOOKS,
	xml: ContentTypes.BOOKS,
	tr2: ContentTypes.BOOKS,
	tr3: ContentTypes.BOOKS,
	oxps: ContentTypes.BOOKS,
	xps: ContentTypes.BOOKS,

	exe: ContentTypes.APPLICATION,
	apk: ContentTypes.APPLICATION,
	rpm: ContentTypes.APPLICATION,
	deb: ContentTypes.APPLICATION,
	jar: ContentTypes.APPLICATION,
	bundle: ContentTypes.APPLICATION,
	com: ContentTypes.APPLICATION,
	so: ContentTypes.APPLICATION,
	dll: ContentTypes.APPLICATION,
	elf: ContentTypes.APPLICATION,
	ipa: ContentTypes.APPLICATION,
	xbe: ContentTypes.APPLICATION,
	xap: ContentTypes.APPLICATION,
	a: ContentTypes.APPLICATION,
	bin: ContentTypes.APPLICATION,
};

const ContentTypeProp = 'contentType';
const ContentCategoryProp = 'contentCategory';

const fileDetect = (file) => {
	let name = file.path.split('/').pop();
	let extension = name.split('.').pop();
	if(name.length == 0)
		return;
	if(extension.length == 0)
		return;

	console.log(name + ':' + extension);
	return ExtesionBase[extension];
}

const torrentTypeDetect = (torrent, files) => {
	let name = torrent.name;

	let typesPriority = {};

	for(let i = 0; i < files.length; i++) {
		let file = files[i];
		let type = fileDetect(file)

		if(type) {
			if(!typesPriority[type])
				typesPriority[type] = 0.;

			typesPriority[type] += file.size / torrent.size;
		}
	}
	let priority = Object.keys(typesPriority).sort(function(a, b){
		 return typesPriority[b] - typesPriority[a]
	});
	if(priority.length > 0)
		torrent[ContentTypeProp] = priority[0];

	console.log(typesPriority);
	console.log(priority);
}

module.exports = torrentTypeDetect;