/* import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-table-with-filter',
  templateUrl: './table-with-filter.component.html',
  styleUrls: ['./table-with-filter.component.scss'],
})
export class TableWithFilterComponent implements OnInit, AfterViewInit {
  @Input('dataset') dataset = [];
  @Input('datasets') datasets = [];
  @Input('filters') filtersParam = [];
  @Input('columns') columns = [];
  @Input('showExportCSV') showExportCSV = true;
  @Input('showExportPDF') showExportPDF = true;
  @Input('overflowMode') overflowMode = 'paginator'
  @Input('paginatorSize') paginatorSize = 10
  @Input('updateEvent') updateEvent: Observable<any>;
  @Input('updateEventFilter') updateFilterEvent: Observable<any>;

  @Output('actions') actionsFired = new EventEmitter();
  @Output('filters') filtersEvent = new EventEmitter();
  @Output('datasetsChanges') datasetsChanges = new EventEmitter();
  @Output('pageEvent') pageEvent = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatSort) sortGroup: QueryList<MatSort>;
  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;


  filterForm: FormGroup;
  datasource: MatTableDataSource<any>;
  datasources: MatTableDataSource<any>[] = [];
  columnsFilter: any = [];
  filters: any = [];
  showFilters = false;
  isGrouped = false;
  groups = [];
  columnGroups = [];

  maxwidth = window.screen.width

  today = Date.now();

  collapseFilters = true;

  sliceFilter = 0;

  multipleColumnsSize = 0;

  charts = []

  lazyLength;

  headerTransparent = true

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({});
    if (this.dataset.length > 0) {
      this.datasource = new MatTableDataSource(this.dataset);
      this.getGroups();
      this.getFilters();
      this.columnsFilter = this.columns.map((column) => column.name);
      this.sliceFilter = this.columnsFilter.length;
    }

    if (this.datasets.length > 0) {
      this.columnsFilter = [];
      this.headerTransparent = this.datasets[0].headerTransparent
      this.datasets.map((dataset) => {
        this.datasources.push(new MatTableDataSource(dataset.data));
        if(dataset.data.length > 0 || dataset.lazy) {
          dataset.columns.filter((data) => !data.hide).map((column) => {
            this.columnsFilter.push(dataset.title + '.' + column.name);
          });
          dataset.columnsName = dataset.columns.map((data) => data.name);
          dataset.filteredColumnsName = dataset.columns.filter((data) => !data.hide).map((data) => data.name );
        }

        //console.log(this.columnsFilter, dataset.filteredColumnsName)
      });
      this.getMultipleColumnsSize();
      this.getGroupsMultiple();
    }
    this.filterForm.valueChanges.subscribe((value) => {
      this.applyFilter();
    });
    this.dateFilters.map(dateFilterControls => {
      dateFilterControls.valueChanges.subscribe((value) => {
        this.applyFilter();
      });
    })

    if(this.updateFilterEvent) {
      this.updateFilterEvent.subscribe(filterConf => {

        filterConf.map(f => {

          setTimeout(() => {
            this.filtersParam[f.index].domain = f.domain
            this.filters[f.index].domain = f.domain
          }, 500);
        })

      })
    }



  }
  paginatorInitialization
  ngAfterViewInit() {

    if (this.datasource) {
      this.datasource.sort = this.sort;
    }
    if (this.datasources.length > 0) {
      let discount = 0
      this.datasources.map((datasource, index) => {
        if(datasource.data.length > 0) {
          //console.log(this.sortGroup.toArray()[index - discount])
          datasource.sort = this.sortGroup.toArray()[index - discount];
          if(this.overflowMode == 'paginator') {
            datasource.paginator = this.paginators.get(index - discount);
          }
        }
        else {
          discount++;
        }
      });
      this.getFiltersMultiple();
      const defaultValues = this.filtersParam.filter(item => item.default)
      defaultValues.map(filter => {
        this.filterForm.get(filter.name).setValue(filter.default)
      })
      this.sliceFilter = this.filters.length;
    }

    if (this.updateEvent) {
      this.updateEvent.subscribe((values) => {
        if (values.constructor.toString().indexOf('Array') > -1) {
          values.map((value, index) => {
            this.datasets[index].data = value;
            this.datasources[index].data = value;
          });
        } else {
          this.datasets[values.index].data = values.data;
          this.datasources[values.index].data = values.data;
          if (!this.datasources[values.index].paginator && !this.paginatorInitialization) {
            this.paginatorInitialization = setTimeout(() => {
              this.datasources[values.index].paginator = this.paginators.first;
              this.datasources[values.index].paginator.initialized.subscribe(() => {
                setTimeout(() => {
                  this.datasources[values.index].paginator.pageIndex = values.page;
                  this.datasources[values.index].paginator.length = values.length;
                }, 500);

              })
            }, 500);

          } else {
            setTimeout(() => {
              this.datasources[values.index].paginator.pageIndex = values.page;
              this.datasources[values.index].paginator.length = values.length;
            }, 500);

          }

        }
      });
    }
    setTimeout(() => {
      this.paintCharts();
      this.applyFilter();
    }, 500)
  }

  pageChange(event) {
    this.pageEvent.emit(event)
  }

  applyFilter() {
    let filterValues = this.filterForm.value;
    const filterFilled = Object.getOwnPropertyNames(filterValues);
    if (this.datasource) {
      const newDataset = this.dataset.filter((data) => {
        let toFilter = true;
        filterFilled.map((filterName) => {
          const filterObj = this.filtersParam.filter(
            (f) => f.name == filterName
          )[0];
          if (
            filterValues[filterName]?.toString().length > 0 &&
            data[filterName] !== filterValues[filterName] &&
            (filterObj.type == 'select' || filterObj.type == 'autocomplete')
          ) {
            toFilter = false;
          }
          if (
            filterObj.type == 'stoplight' &&
            filterValues[filterName].toString() !== ''
          ) {
            if (
              !(
                (filterValues[filterName].toString() == 'red' &&
                  data[filterObj.reference] < filterObj.min) ||
                (filterValues[filterName].toString() == 'green' &&
                  data[filterObj.reference] > filterObj.max) ||
                (filterValues[filterName].toString() == 'yellow' &&
                  data[filterObj.reference] >= filterObj.min &&
                  data[filterObj.reference] <= filterObj.max)
              )
            ) {
              toFilter = false;
            }
          }
          if (
            filterObj.type == 'range'
          ) {
            console.warn('Filtro de data', data[filterName], filterValues)
            if (
              filterValues[filterName].start &&
              filterValues[filterName].end
            ) {
              if (
                data[filterName] < filterValues[filterName].start ||
                data[filterName] > filterValues[filterName].end
              ) {
                toFilter = false;
              }
            } else if (filterValues[filterName].start) {
              if (data[filterName] < filterValues[filterName].start) {
                toFilter = false;
              }
            } else if (filterValues[filterName].end) {
              if (data[filterName] > filterValues[filterName].end) {
                toFilter = false;
              }
            }
          }
        });
        if (toFilter) {
          return data;
        }
      });
      this.datasource.data = newDataset;
    }
    if (this.datasets.length > 0) {
      this.datasources.map((datasource, index) => {
        const newDataset = this.datasets[index].data.filter((data, i) => {
          let toFilter = true;
          filterFilled.map((filterName) => {
            const filterObj = this.filtersParam.filter(
              (f) => f.name == filterName
            )[0];
            if(filterObj.type == 'highlightLower' && filterValues[filterName]?.toString().length > 0){
              //Encontra a cor
              console.log('Colorindo graficos de acordo com o high')
              const selectedCol = this.datasets[index].columns.filter(col => col.highligthLower == filterObj.name)[0]
              const selectedColor = selectedCol.highligthLowerColor;

              const barColumns = this.datasets[index].columns.filter(col => col.type == 'barchart')
              if(barColumns.length > 0) {
                const barData = barColumns[0].data;
                const barIndex = barData.map(item => item.reference).indexOf(selectedCol.name)
                const chartFiltered = this.charts.filter(c => c.datasetIndex == index);
                chartFiltered.map((c, i) => {
                  if(c.chart.data.datasets[0].data[barIndex] < filterValues[filterName]) {
                    c.chart.data.datasets[0].backgroundColor[barIndex] = selectedColor;
                    c.chart.update();
                  } else {
                    c.chart.data.datasets[0].backgroundColor[barIndex] = barData[barIndex].color;
                    c.chart.update();
                  }
                })

              }
            }
            if (
              filterValues[filterName]?.toString().length > 0 &&
              data[filterName] !== filterValues[filterName] &&
              (filterObj.type == 'select' || filterObj.type == 'autocomplete')
            ) {
              toFilter = false;
            }
            if (
              filterObj.type == 'stoplight' &&
              filterValues[filterName].toString() !== ''
            ) {
              if (
                !(
                  (filterValues[filterName].toString() == 'red' &&
                    data[filterObj.reference] < filterObj.min) ||
                  (filterValues[filterName].toString() == 'green' &&
                    data[filterObj.reference] > filterObj.max) ||
                  (filterValues[filterName].toString() == 'yellow' &&
                    data[filterObj.reference] >= filterObj.min &&
                    data[filterObj.reference] <= filterObj.max)
                )
              ) {
                toFilter = false;
              }
            }
            if (
              filterObj.type == 'range' &&
              (filterValues[filterName].start || filterValues[filterName].end)
            ) {
              if (
                filterValues[filterName].start &&
                filterValues[filterName].end
              ) {
                //const dataDate = new Date(data[filterName])
                const dataDate = moment(data[filterName]).toDate()
                const endDate = moment(filterValues[filterName].end).add(1, 'days').toDate();

                  console.log(endDate, data[filterName], dataDate)
                if (
                  dataDate.getTime() < filterValues[filterName].start.getTime() ||
                  dataDate.getTime() > endDate.getTime() || !data[filterName]
                ) {
                  toFilter = false;
                }
              } else if (filterValues[filterName].start) {
                if (data[filterName] < filterValues[filterName].start) {
                  toFilter = false;
                }
              } else if (filterValues[filterName].end) {
                if (data[filterName] > filterValues[filterName].end) {
                  toFilter = false;
                }
              }
            }
          });
          if (toFilter) {
            return data;
          }
        });
        datasource.data = newDataset;
      });
    }
    this.filtersEvent.emit({filters: this.filters, form: this.filterForm.value})
  }

  dateFilters = [];
  getFilters() {
    this.filtersParam.map((filter) => {
      const newFilter: any = {};
      newFilter.name = filter.name;
      newFilter.title = filter.title;
      newFilter.type = filter.type;
      newFilter.domain = this.dataset
        .map((data) => data[filter.name])
        .filter(this.onlyUnique)
        .sort();
      this.filters.push(newFilter);
      if (filter.type == 'range') {
        const dateFilter = this.formBuilder.group({
          start: this.formBuilder.control(''),
          end: this.formBuilder.control(''),
        });
        this.dateFilters.push(dateFilter);
        this.filterForm.addControl(filter.name, dateFilter);
      } else {
        this.filterForm.addControl(filter.name, this.formBuilder.control(''));
      }
    });
    setTimeout(() => {
      this.filtersEvent.emit({filters: this.filters, form: this.filterForm.value});
      this.showFilters = true;
    }, 0);
  }

  getFiltersMultiple() {
    this.filtersParam.map((filter) => {
      const newFilter: any = {};
      newFilter.name = filter.name;
      newFilter.title = filter.title;
      newFilter.type = filter.type;
      if(!filter.domain) {
        newFilter.domain = this.datasets
        .flatMap((data) => data.data)
        .map((data) => data[filter.name])
        .filter(this.onlyUnique)
        .sort();
      } else {
        newFilter.domain = filter.domain.map(item => item[filter.key] || item)
      }

      this.filters.push(newFilter);

      if(filter.type == 'highlightLower') {
        this.filterForm.addControl(filter.name, this.formBuilder.control(filter.limit));
      } if (filter.type == 'range') {
        const dateFilter = this.formBuilder.group({
          start: this.formBuilder.control(''),
          end: this.formBuilder.control(''),
        });
        this.dateFilters.push(dateFilter);
        this.filterForm.addControl(filter.name, dateFilter);
      } else {
        this.filterForm.addControl(filter.name, this.formBuilder.control(''));
      }

    });
    setTimeout(() => {
      this.filtersEvent.emit({filters: this.filters, form: this.filterForm.value});
      this.showFilters = true;
    }, 0);
  }

  getGroups() {
    if (this.columns[0].group) {
      this.columns.map((data) => {
        const indexOfGroup = this.groups
          .map((data) => data.name)
          .indexOf(data.group);
        if (indexOfGroup >= 0) {
          this.groups[indexOfGroup].counter =
            this.groups[indexOfGroup].counter + 1;
        } else {
          const widthArray = this.columns.filter(col => col.group == data.group && !col.hide)
          let width = 0
          const finalWidth = widthArray.reduce((accumulator, currentValue) => {
            return accumulator + ' + ' + currentValue.width;
          }, widthArray.length * 9 +'px')

          this.groups.push({
            name: data.group,
            counter: 1,
            color: data.colorGroup,
            alignment: data.alignment,
            colorHeader: data.colorHeader,
            groupWidth: finalWidth
          });
        }
      });
      this.columnGroups = this.groups.map((group) => group.name);
      this.isGrouped = true;
    }
  }

  getGroupsMultiple() {
    this.datasets.map((dataset, indexDataset) => {
      //if(dataset.data.lenght > 0) {
        const groups = [];
      if (dataset.columns[0].group) {
        dataset.columns.map((data, index) => {
          const indexOfGroup = groups
            .map((data) => data.name)
            .indexOf(data.group);
          if (indexOfGroup >= 0) {
            groups[indexOfGroup].counter = groups[indexOfGroup].counter + 1;
          } else {

            const widthArray = this.datasets[indexDataset].columns.filter(col => col.group == data.group && dataset.filteredColumnsName && dataset.filteredColumnsName.indexOf(col.name) >= 0)
            //console.log(widthArray)
            let width = 0
            let columnCount = 0

            widthArray.map(col => {
              const isVisible = this.datasets[indexDataset].filteredColumnsName ? this.datasets[indexDataset].filteredColumnsName.indexOf(col.name) : true;
              const value = Number.parseFloat(col.width.substr(0, col.width.length - 1))
              if(isVisible >= 0) {
                width = width + value
                columnCount = columnCount + 1
              }

            })

            const finalWidthArray = widthArray.filter(item => !item.hide)
            const finalWidth = finalWidthArray.reduce((accumulator, currentValue) => {
              return accumulator + ' + ' + currentValue.width;
            }, finalWidthArray.length * 9 +'px')
            groups.push({
              name: data.group,
              counter: 1,
              color: data.colorGroup,
              alignment: data.alignment,
              colorHeader: data.colorHeader || data.colorGroup,
              groupWidth: 'calc('+finalWidth+')',
              columnCount: finalWidthArray.length
            });
          }
        });
        dataset.columnGroups = groups;
        //console.log(dataset, groups)
        dataset.columnGroupsName = groups.map((group) => group.name);
      }
      //}

      this.isGrouped = true;
    });
  }

  getFormGroup(value, name) {
    const formGroup: FormGroup = this.filterForm.get(value) as FormGroup;
    const control = formGroup.get('start') as FormControl;
    if (control) {
      return formGroup.get(name) as FormControl;
    } else {
      return null;
    }
  }

  onlyUnique(value, index, self) {
    return self.map((i) => i).indexOf(value) === index;
  }

  changeMultipleDatasetsColumns(event) {
    const optionsSelected = [];
    event.value.map((value) => {
      const values = value.split('.');
      optionsSelected.push({ dataset: values[0], value: values[1] });
    });

    this.datasets.map((dataset) => {
      const datasetOptions = optionsSelected
        .filter((os) => os.dataset == dataset.title)
        .map((os) => os.value);
      dataset.filteredColumnsName = datasetOptions;
    });
  }

  getMultipleColumnsSize() {
    let size = 0;
    this.datasets.map((dt) => {
      size = size + dt.columns.length;
    });
    this.multipleColumnsSize = size;
    return size;
  }

  mapToChart(data, column) {
    const barChartData = {
      limit: 60,
      datasets: [],
    };

    if(column.data) {
      column.data.map((d, index) => {
        //console.log(column.highligthLower, this.filterForm.get(column.highligthLower).value, d[column.name] < this.filterForm.get(column.highligthLower).value)
        if(column.highligthLower && this.filterForm.get(column.highligthLower).value && d[column.name] < this.filterForm.get(column.highligthLower).value) {

          barChartData.datasets.push({ color: column.highligthLowerColor, data: data[d.reference] });
        } else {
          barChartData.datasets.push({ color: d.color, data: data[d.reference] });
        }

      });
    }
    //console.log(barChartData)
    return barChartData;
  }

  convertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'id, ';

    for (let index in headerList) {
      row += headerList[index].title + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + '';
      for (let index in headerList) {
        let head = headerList[index].name;
        if(headerList[index].type == 'date' && array[i][head]) {
          line += ',' + moment(array[i][head].toString()).format(headerList[index].mask);
        } else {
          line += ',' + array[i][head];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  downloadFile(csvData, filename = 'data') {

    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  exportCsv() {
    if(this.dataset.length > 0) {
      const csv = this.convertToCSV(
        this.dataset,
        this.columns.filter((c) => c.toCsv)
      );
      this.downloadFile(csv);
    } else {
      let csv = '';
      this.datasets.map((ds, index) => {
        if(index > 0) {
          csv = csv + '\n\n';
        }
        console.log(ds.columns.filter((c) => c.toCsv))
        csv=csv + this.convertToCSV(
          ds.data,
          ds.columns.filter((c) => c.toCsv)
        )
      })
      this.downloadFile(csv);
    }
  }

  labelsColumnChart = [];
  setLabelsColumnChart(event) {
    this.labelsColumnChart = event
  }

  exportPdf(data, columns) {
    const columnsName = columns.filter(c => c.toPdf).map(c => c.name)
    const columnsTitle = columns.filter(c => c.toPdf).map(c => c.title || {columns: [...this.labelsColumnChart.map(x => {return {text: x, width: '*'}})].slice(0, -1)})
    const filteredColumns = columns.filter(c => c.toPdf)
    const table2 = [];
    table2.push(columnsTitle)
    data.map((d, i) => {
      const row = [];
      columnsName.map((c, index) => {
        if(filteredColumns[index].type == 'barchart') {
          row.push({image: this.charts[i].chart.toBase64Image(), height: 30, width: 563})
        } else {
          row.push({text: d[c].toString()})
        }

      })
      table2.push(row)
    })
    const widths = filteredColumns.map(c => {
      if(c.type == 'text') {
        return 'auto'
      } else {
        return '*'
      }
    });
    console.log(table2)
    const def = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ],
      content: [
        {
          width: '*',
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: widths,
            body: [
              ...table2

            ]
          }
        }
      ]
    };
    pdfMake.createPdf(def).open();
  }
  exportPdfMultiple() {
    this.datasets.map(ds => {
      const columnsName = ds.columns.filter(c => c.toPdf && ds.filteredColumnsName.indexOf(c.name) >= 0).map(c => c.name)
    const columnsTitle = ds.columns.filter(c => c.toPdf && ds.filteredColumnsName.indexOf(c.name) >= 0).map(c => c.title || {columns: [...this.labelsColumnChart.map(x => {return {text: x, width: '*'}})].slice(0, -1)})
    const filteredColumns = ds.columns.filter(c => c.toPdf && ds.filteredColumnsName.indexOf(c.name) >= 0)
    const table2 = [];
    table2.push(columnsTitle)
    ds.data.map((d, i) => {
      const row = [];
      columnsName.map((c, index) => {
        if(filteredColumns[index].type == 'barchart') {
          row.push({image: this.charts[i].chart.toBase64Image(), height: 30, width: 563})
        } else if(filteredColumns[index].type == 'date') {
          if(d[c]){
            console.log(d[c])
            row.push({text: moment(d[c]).format('DD/MM HH:MM')})
          } else {
            row.push({text: ''})
          }
        }else {
          row.push({text: d[c] ? d[c].toString():''})
        }

      })
      table2.push(row)
    })
    const widths = filteredColumns.map(c => {
      if(c.type == 'text') {
        return 'auto'
      } else {
        return '*'
      }
    });
    console.log(table2)
    const def = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ],
      content: [
        {
          width: '*',
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: widths,
            body: [
              ...table2

            ]
          }
        }
      ],
      defaultStyle: {
        fontSize: 6,
        bold: false
      }
    };
    pdfMake.createPdf(def).open();
    })


  }

  filterDateChange(filter, mode, event) {
    console.log('TESTE', filter, mode, event)
    let obj:any = this.filterForm.get(filter).value;
    if(obj == '') {
      obj = {}
    }
    obj[mode] = event.value
    this.filterForm.get(filter).setValue(obj)
    this.applyFilter()
  }

  paintCharts() {
    this.datasets.map((ds, indexDataset) => {
      let hasBarChart = false;
      let columnBarChart;
      let hasLowerReference = false;
      let lower;
      ds.columns.map((column, indexColumn) => {
        if(column.type == 'barchart') {
          hasBarChart = true
          columnBarChart = column;
        }
        if(column.hasOwnProperty('highligthLowerReference')) {
          hasLowerReference = true
          lower = column
        }
      })

      if(hasLowerReference && hasBarChart) {
        const selectedCol = lower
        const selectedColor = selectedCol.highligthLowerColor;

        const barData = columnBarChart.data;
        const barIndex = barData.map(item => item.reference).indexOf(selectedCol.name)
        console.log(this.charts)
        const chartTmp = this.charts.filter(c => c.datasetIndex == indexDataset)
        chartTmp.map((chart, indexChart) => {

          if(chart.chart.data.datasets[0].data[barIndex] < ds.data[indexChart][lower.highligthLowerReference]) {
            chart.chart.data.datasets[0].backgroundColor[barIndex] = selectedColor;
            chart.chart.update();
          } else {
            chart.chart.data.datasets[0].backgroundColor[barIndex] = barData[barIndex].color;
            chart.chart.update();
          }
        })
      }
    })
  }

  change(data, field) {
    data.needSave = true;
    console.log('change tabela')
    this.datasetsChanges.emit({config: this.datasets, item: data, field: field})
  }
}
 */
