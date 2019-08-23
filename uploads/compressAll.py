from PIL import Image
import glob
images=glob.glob('*.jpg')

images+=glob.glob('*.png')
# foo = Image.open("sablog.jpg")
for image in images:
	foo = Image.open(image)
	foo = foo.resize((300,300),Image.ANTIALIAS)
	foo.save(image,quality=10,optimize=True)
	# foo.show()