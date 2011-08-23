
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
	res = ""
	cnt = 0
	tmp = []
	point = []
	while len(t) > 0 :
		head, t = tok(t)
		if head == 'm':
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			result = result + "ctx.moveTo(%r, %r);\n" %(p1x, p1y)
			res = res + "ctx.moveTo(point[%r], point[%r]);\n" %(cnt, cnt+1)
			cnt += 2
			tmp = []
		elif head == 'V' or head == 'v' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			p2x = float(tmp[2])
			p2y = 630 - float(tmp[3])
			result = result + "ctx.quadraticCurveTo(%r, %r, %r, %r);\n" %(p1x, p1y, p2x, p2y)
			res = res + "ctx.quadraticCurveTo(point[%r], point[%r], point[%r], point[%r]);\n" %(cnt, cnt+1, cnt+2, cnt+3)
			cnt += 4
			tmp = []
		elif head == 'C' or head == 'c' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			p2x = float(tmp[2])
			p2y = 630 - float(tmp[3])
			p3x = float(tmp[4])
			p3y = 630 - float(tmp[5])
			result = result + "ctx.bezierCurveTo(%r, %r, %r, %r, %r, %r);\n" %(p1x, p1y, p2x, p2y, p3x, p3y)
			res = res + "ctx.bezierCurveTo(point[%r], point[%r], point[%r], point[%r], point[%r], point[%r]);\n" %(cnt, cnt+1, cnt+2, cnt+3, cnt+4, cnt+5)
			cnt += 6
			tmp = []
		elif head == 'l' :
			p1x = float(tmp[0])
			p1y = 630 - float(tmp[1])
			result = result + "ctx.lineTo(%r, %r)\n" %(p1x, p1y)
			res = res + "ctx.lineTo(point[%r], point[%r]);\n" %(cnt, cnt+1)
			cnt += 2
			tmp = []
		else :
			tmp.append(head)
			if len(tmp) % 2 == 0 : point.append(630 - float(head))
			else : point.append(float(head))
	return result, res, point

data = """306.9616 283.9645 m
285.9642 247.9690 249.9687 249.9687 V
235.9705 243.9695 247.9690 237.9702 V
232.9709 229.9712 245.9692 223.9720 V
235.9705 216.9729 247.9690 212.9734 V
267.9665 185.9767 332.9584 216.9729 v
""";

a, b, c = conv(data)
print a
print b
print c


