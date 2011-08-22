
def tok(t):
	val = ""
	while 1:
		head = t[0]
		t = t[1:]
		if head == ' ' or head == '\n' :
			return val, t
		val += head


def conv(t):
	result = ""
	tmp = []
	while len(t) > 0 :
		head, t = tok(t)
		if head == 'm':
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			result = result + "ctx.moveTo(%r, %r);\n" %(p1x, p1y)
			tmp = []
		elif head == 'V' or head == 'v' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			p2x = float(tmp[2])
			p2y = 630 - float(tmp[3])
			result = result + "ctx.quadraticCurveTo(%r, %r, %r, %r);\n" %(p1x, p1y, p2x, p2y)
			tmp = []
		elif head == 'C' or head == 'c' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			p2x = float(tmp[2])
			p2y = 630 - float(tmp[3])
			p3x = float(tmp[4])
			p3y = 630 - float(tmp[5])
			result = result + "ctx.bezierCurveTo(%r, %r, %r, %r, %r, %r);\n" %(p1x, p1y, p2x, p2y, p3x, p3y)
			tmp = []
		elif head == 'l' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			result = result + "ctx.lineTo(%r, %r)\n" %(p1x, p1y)
			tmp = []
		else :
			tmp.append(head)

	return result

data = """126.9841 336.9579 m
38.9951 189.9762 130.9836 51.9935 V
99.9875 37.9952 95.9880 29.9962 V
92.6680 15.8642 105.9260 21.9408 V
95.7062 17.2452 99.0207 11.4449 V
100.6780 7.5780 108.9642 14.2070 V
93.4966 -1.5369 121.3936 4.5397 V
191.8268 13.6545 175.2543 41.2754 V
165.0095 39.4995 188.7202 72.6050 V
219.1415 58.9602 270.8129 77.9735 V
266.1155 74.1708 279.3130 53.5917 V
255.8292 33.2128 283.3426 22.9233 V
324.7245 -4.1426 337.4746 7.2653 V
340.6062 7.2653 334.7904 14.8706 V
341.0535 9.5022 344.8562 9.5022 V
347.5404 9.5022 343.2904 20.6864 V
342.8430 15.0942 350.6720 16.6601 V
361.4090 25.8312 320.0271 50.2130 V
405.9492 206.9741 320.9599 328.9589 v
""";

print conv(data)

