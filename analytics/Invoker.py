import json
import collections
import numpy
import matplotlib.pyplot as plt

class Invoker:
    def __init__(self, filename):
        od = collections.OrderedDict(sorted(json.load(open(filename)).items())

